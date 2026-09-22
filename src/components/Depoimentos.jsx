function Depoimentos() {
  const depoimentos = [
    {
      texto: "Peço quase todo dia no almoço. Nunca atrasou e o suporte responde na hora quando preciso trocar algo.",
      nome: "Camila Rocha",
      cidade: "São Paulo, SP",
      inicial: "C",
      cor: "from-[#FF6B35] to-[#F7B267]",
    },
    {
      texto: "O filtro por tipo de comida salva demais. Acho opção vegana perto de casa em segundos.",
      nome: "Rafael Lima",
      cidade: "Campinas, SP",
      inicial: "R",
      cor: "from-[#2A9D8F] to-[#8AC926]",
    },
    {
      texto: "Acompanhar o entregador no mapa mudou tudo. Sei exatamente quando descer para pegar o pedido.",
      nome: "Beatriz Nunes",
      cidade: "Rio de Janeiro, RJ",
      inicial: "B",
      cor: "from-[#6D597A] to-[#B56576]",
    },
  ];

  return (
    <section id="depoimentos" className="py-24 bg-gradient-to-br from-yellow-200 to-pink-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block bg-[#FF6B35]/10 text-[#FF6B35] text-xs font-bold px-4 py-2 rounded-full mb-5">
            Depoimentos
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Quem pede, volta</h2>
          <p className="text-[#1F1B18]/60 max-w-xl mx-auto">
            Avaliação média de 4.9 entre mais de 180 mil pessoas.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {depoimentos.map((d) => (
            <div key={d.nome} className="p-8 rounded-3xl bg-white border border-[#1F1B18]/5 shadow-sm">
              <div className="text-[#FF6B35] text-sm mb-4">★★★★★</div>
              <p className="text-[#1F1B18]/70 leading-relaxed mb-6">"{d.texto}"</p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${d.cor} flex items-center justify-center font-bold text-white`}>
                  {d.inicial}
                </div>
                <div>
                  <p className="font-semibold text-sm">{d.nome}</p>
                  <p className="text-xs text-[#1F1B18]/50">{d.cidade}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Depoimentos;