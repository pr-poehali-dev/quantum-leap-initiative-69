import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "Как происходит заказ изделия?",
    answer:
      "Всё начинается с замера. Наш специалист выезжает на объект, снимает точные размеры и обсуждает с вами породу камня, цвет и обработку кромки. После этого мы готовим смету и согласовываем сроки. Средний срок изготовления — 10–21 рабочий день.",
  },
  {
    question: "Какие породы камня вы используете?",
    answer:
      "Мы работаем с более чем 200 породами: мрамор (Calacatta, Statuario, Nero Marquina), гранит, оникс, кварцит, травертин, сланец. Слэбы поставляются напрямую из Италии, Испании, Бразилии и Индии. Вы всегда можете приехать в наш шоурум и выбрать конкретную плиту.",
  },
  {
    question: "Вы делаете замер и монтаж?",
    answer:
      "Да, полный цикл. Мы выезжаем на замер, изготавливаем изделие на производстве и монтируем силами собственных мастеров. Не нужно искать отдельную бригаду — всё под ключ с гарантией.",
  },
  {
    question: "Можно ли заказать одну столешницу, не весь кухонный гарнитур?",
    answer:
      "Конечно. Мы изготавливаем единичные изделия: одна столешница, один подоконник, одна ступень. Минимального объёма заказа нет.",
  },
  {
    question: "Как ухаживать за изделием из натурального камня?",
    answer:
      "Мы наносим защитное покрытие на все изделия перед монтажом. Мрамор достаточно протирать мягкой тканью и мягкими нейтральными средствами. Избегайте кислот (лимонный сок, уксус) на мраморе. При необходимости мы проводим реставрацию и полировку.",
  },
  {
    question: "В каких городах вы работаете?",
    answer:
      "Производство находится в Москве. Мы работаем по всему Подмосковью и крупным городам России — Санкт-Петербург, Сочи, Казань и другие. Стоимость доставки и монтажа рассчитывается индивидуально.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Вопросы</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            Частые вопросы
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg font-medium text-foreground transition-colors group-hover:text-foreground/70">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}