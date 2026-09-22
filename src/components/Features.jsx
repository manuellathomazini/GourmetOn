import { Search, SlidersHorizontal, MapPinned, BellRing } from "lucide-react";

const FEATURES = [
  {
    icon: Search,
    title: "Busca por tipo de comida",
    text: "Digite 'japonesa', 'vegana' ou o nome do prato — os resultados aparecem na hora.",
  },
  {
    icon: SlidersHorizontal,
    title: "Filtros inteligentes",
    text: "Refine por preço, tempo de entrega, avaliação ou restrições alimentares.",
  },
  {
    icon: MapPinned,
    title: "Rastreamento ao vivo",
    text: "Acompanhe o entregador no mapa, do preparo à chegada na sua porta.",
  },
  {
    icon: BellRing,
    title: "Notificações em tempo real",
    text: "Saiba exatamente quando seu pedido foi aceito, preparado e saiu para entrega.",
  },
];

export default function Features() {
  return (
    <section id="funcionalidades" className="bg-charcoal py-24 text-cream">
      <div className="mx-auto max-w-content px-6 md:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl">
              Tudo que você precisa,
              <br />
              <span className="text-ember">em um só app.</span>
            </h2>
            <p className="mt-5 max-w-sm text-cream/65">
              Ferramentas pensadas para encontrar exatamente o que você quer
              comer, sem rolar a tela por horas.
            </p>
          </div>

          <div className="divide-y divide-white/10">
            {FEATURES.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="flex items-start gap-5 py-6 first:pt-0"
              >
                <Icon
                  className="mt-1 h-6 w-6 shrink-0 text-ember"
                  strokeWidth={1.75}
                />
                <div>
                  <h3 className="font-display text-xl text-cream">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-cream/65">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
