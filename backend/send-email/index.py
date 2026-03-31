import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта ЯР Камень на почту владельца"""

    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    message = body.get("message", "").strip()

    if not name or not phone:
        return {
            "statusCode": 400,
            "headers": headers,
            "body": json.dumps({"error": "Имя и телефон обязательны"}, ensure_ascii=False),
        }

    smtp_password = os.environ.get("SMTP_PASSWORD", "")
    from_email = "yarankin63@gmail.com"
    to_email = "yarankin63@gmail.com"

    html_body = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a1a1a; border-bottom: 2px solid #1a1a1a; padding-bottom: 10px;">
            Новая заявка с сайта ЯР Камень
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="padding: 12px 0; color: #666; width: 120px;">Имя:</td>
                <td style="padding: 12px 0; color: #1a1a1a; font-weight: bold;">{name}</td>
            </tr>
            <tr style="border-top: 1px solid #eee;">
                <td style="padding: 12px 0; color: #666;">Телефон:</td>
                <td style="padding: 12px 0; color: #1a1a1a; font-weight: bold;">
                    <a href="tel:{phone}" style="color: #1a1a1a;">{phone}</a>
                </td>
            </tr>
            {"<tr style='border-top: 1px solid #eee;'><td style='padding: 12px 0; color: #666; vertical-align: top;'>Сообщение:</td><td style='padding: 12px 0; color: #1a1a1a;'>" + message + "</td></tr>" if message else ""}
        </table>
    </div>
    """

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Заявка от {name} — ЯР Камень"
    msg["From"] = from_email
    msg["To"] = to_email
    msg.attach(MIMEText(html_body, "html"))

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(from_email, smtp_password)
        server.sendmail(from_email, to_email, msg.as_string())

    return {
        "statusCode": 200,
        "headers": headers,
        "body": json.dumps({"ok": True}),
    }