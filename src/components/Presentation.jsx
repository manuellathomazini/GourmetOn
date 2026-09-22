import print from '../assets/print/delivery.avif'

const Presentation = () => {
  return (
    <div>
      <section id="apresentacao" className="py-24 bg-gradient-to-bl from-amber-900 to-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              GourmetOn
            </h2>
            <span className="inline-block text-xs font-bold px-4 py-2 rounded-full mb-5">
              Somos um delivery de comida, feito para você pedir sua refeição sem esforço e no conforto de sua casa
            </span>

            <div className="space-y-6">
              <div className="flex gap-4 bg-white/5 border border-white/10 rounded-[2.5rem] p-3 shadow-2xl">
                <div className="w-11 h-11 shrink-0 rounded-xl flex items-center justify-center text-xl">🛵</div>
                <div>
                  <h3 className="font-bold mb-1">Entrega rápida</h3>
                  <p className="text-sm leading-relaxed">
                    Média de 30 minutos, com rastreio em tempo real do entregador no mapa.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 bg-white/5 border border-white/10 rounded-[2.5rem] p-3 shadow-2xl">
                <div className="w-11 h-11 shrink-0 rounded-xl flex items-center justify-center text-xl">🍽️</div>
                <div>
                  <h3 className="font-bold mb-1">Variedade de restaurantes</h3>
                  <p className="text-sm leading-relaxed">
                    Mais de 2.000 parceiros, de comida japonesa a sobremesas artesanais.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 bg-white/5 border border-white/10 rounded-[2.5rem] p-3 shadow-2xl">
                <div className="w-11 h-11 shrink-0 rounded-xl flex items-center justify-center text-xl">💳</div>
                <div>
                  <h3 className="font-bold mb-1">Pagamento fácil</h3>
                  <p className="text-sm leading-relaxed">
                    Pix, cartão ou na entrega — salve sua forma favorita e finalize em um toque.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:flex justify-center">
            <div className="w-64 h-[28rem] bg-white/5 border border-white/10 rounded-[2.5rem] p-3 shadow-2xl">
              <div className="w-full h-full rounded-[2rem] p-5 flex flex-col gap-4">
                <img src={print} alt="Print do App"/>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Presentation
