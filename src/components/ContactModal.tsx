import { useState } from "react"
import func2url from "../../backend/func2url.json"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch(func2url["send-email"], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message }),
      })
      if (res.ok) {
        setStatus("success")
        setName("")
        setPhone("")
        setMessage("")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white w-full max-w-lg shadow-2xl z-10">
        <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-stone-100">
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-stone-400 mb-1">Бесплатно</p>
            <h2 className="text-2xl font-medium text-stone-900">Получить расчёт стоимости</h2>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-900 transition-colors ml-4"
            aria-label="Закрыть"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="px-8 py-8">
          {status === "success" ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 bg-stone-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-stone-900 mb-2">Заявка отправлена!</h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                Мы свяжемся с вами в ближайшее время для обсуждения проекта.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-8 py-3 bg-stone-900 text-white text-sm tracking-wide hover:bg-stone-700 transition-colors"
              >
                Закрыть
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs tracking-[0.15em] uppercase text-stone-400 mb-2">Ваше имя *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Иван Иванов"
                  className="w-full border border-stone-200 px-4 py-3 text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-900 transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-xs tracking-[0.15em] uppercase text-stone-400 mb-2">Телефон *</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  placeholder="+7 (___) ___-__-__"
                  className="w-full border border-stone-200 px-4 py-3 text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-900 transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-xs tracking-[0.15em] uppercase text-stone-400 mb-2">
                  Что нужно сделать?
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder="Например: столешница на кухню из мрамора, размер 2400×600 мм"
                  className="w-full border border-stone-200 px-4 py-3 text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-900 transition-colors text-sm resize-none"
                />
              </div>

              {status === "error" && (
                <p className="text-red-500 text-sm">Ошибка отправки. Попробуйте ещё раз или позвоните нам.</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-stone-900 text-white py-4 text-sm tracking-wide hover:bg-stone-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Отправляем..." : "Отправить заявку"}
              </button>

              <p className="text-xs text-stone-400 text-center">
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
