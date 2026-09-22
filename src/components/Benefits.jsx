import { Zap, Store, CreditCard } from "lucide-react";

const BENEFITS = [
  {
    icon: Zap,
    title: "Entrega rápida",
    text: "Pedidos rastreados do fogão até sua porta, com tempo médio de 28 minutos na sua região.",
  },
  {
    icon: Store,
    title: "Variedade de restaurantes",
    text: "Mais de 3 mil restaurantes parceiros, de bares de esquina a cozinhas premiadas.",
  },
  {
    icon: CreditCard,
    title: "Pagamento fácil",
    text: "Cartão, Pix ou saldo em carteira — finalize o pedido em menos de 10 segundos.",
  },
];

export default function Benefits() {
  return (
    <section id="beneficios" className="border-b border-line bg-cream py-24">
      <div className="mx-auto max-w-content px-6 md:px-8">
        <div className="max-w-xl">
          <h2 className="font-display text-4xl text-ink sm:text-5xl">
            Feito para quem não quer esperar.
          </h2>
          <p className="mt-4 text-ink/65">
            Três motivos pelos quais milhares de pessoas trocaram o delivery
            de sempre pelo GourmetOn.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-3">
          {BENEFITS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="border-t border-line pt-6">
              <Icon className="h-6 w-6 text-ember" strokeWidth={1.75} />
              <h3 className="mt-4 font-display text-2xl text-ink">{title}</h3>
              <p className="mt-2 leading-relaxed text-ink/65">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
