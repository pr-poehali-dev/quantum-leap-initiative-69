import { useEffect, useRef, useState } from "react"
import { Home, Building, Armchair, Trees } from "lucide-react"
import { HighlightedText } from "./HighlightedText"

const expertiseAreas = [
  {
    title: "Столешницы и кухни",
    description: "Мраморные и гранитные столешницы под точные замеры. Фартуки, острова, подоконники — полный кухонный комплект из единого слэба.",
    icon: Home,
  },
  {
    title: "Каминные порталы",
    description:
      "Портал из натурального камня — сердце гостиной. Создаём авторские конструкции любой сложности: от классики до современного минимализма.",
    icon: Building,
  },
  {
    title: "Ванные комнаты",
    description:
      "Столешницы под раковины, облицовка стен и пола, душевые поддоны. Мрамор и оникс превращают ванную в настоящий spa-санктуарий.",
    icon: Armchair,
  },
  {
    title: "Лестницы и полы",
    description:
      "Ступени, подступенки, площадки — из гранита, мрамора или кварцита. Напольные покрытия и декоративные панели для жилых и коммерческих объектов.",
    icon: Trees,
  },
]

export function Expertise() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.2 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-20">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Наши услуги</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
            <HighlightedText>Изделия</HighlightedText> из камня
            <br />
            под заказ
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Мы работаем с более чем 200 породами камня со всего мира. Любой объём, любая сложность — от единственной столешницы до полной облицовки особняка.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          {expertiseAreas.map((area, index) => {
            const Icon = area.icon
            return (
              <div
                key={area.title}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                data-index={index}
                className={`relative pl-8 border-l border-border transition-all duration-700 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div
                  className={`transition-all duration-1000 ${
                    visibleItems.includes(index) ? "animate-draw-stroke" : ""
                  }`}
                  style={{
                    transitionDelay: `${index * 150}ms`,
                  }}
                >
                  <Icon className="w-10 h-10 mb-4 text-foreground" strokeWidth={1.25} />
                </div>
                <h3 className="text-xl font-medium mb-4">{area.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{area.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}