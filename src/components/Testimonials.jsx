import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Camila Rocha",
    role: "São Paulo, SP",
    text: "Peço pelo GourmetOn quase todo dia. O rastreamento em tempo real me deixa exatamente na hora de descer para pegar o pedido.",
    avatar: "https://i.pravatar.cc/100?img=47",
  },
  {
    name: "Bruno Alencar",
    role: "Curitiba, PR",
    text: "Os filtros por restrição alimentar salvaram minha vida — encontro opção sem glúten em segundos, sem ficar ligando para o restaurante.",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    name: "Larissa Nunes",
    role: "Recife, PE",
    text: "A variedade de restaurantes é enorme. Descobri lugares que nem sabia que existiam no meu bairro.",
    avatar: "https://i.pravatar.cc/100?img=32",
  },
];

export default function Testimonials() {
  return (
    <section id="depoimentos" className="border-t border-line bg-cream py-24">
      <div className="mx-auto max-w-content px-6 md:px-8">
        <h2 className="font-display text-4xl text-ink sm:text-5xl">
          Quem usa, recomenda.
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col justify-between rounded-2xl bg-white p-7 shadow-sm"
            >
              <div>
                <div className="flex gap-0.5 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold" />
                  ))}
                </div>
                <blockquote className="mt-4 leading-relaxed text-ink/75">
                  "{t.text}"
                </blockquote>
              </div>

              <figcaption className="mt-6 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-11 w-11 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <p className="font-semibold text-ink">{t.name}</p>
                  <p className="text-sm text-ink/55">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
