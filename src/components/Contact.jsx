import { useState } from 'react';

function Contact() {
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // Por enquanto só mostra a mensagem de sucesso.
    // Depois dá pra trocar por uma chamada fetch de verdade para uma API.
    console.log('Cadastro:', { email });
    setEnviado(true);
  }

  return (
    <section id="contato" className="py-24 bg-gradient-to-bl from-amber-900 to-green-300/60">
      <div className="max-w-2xl mx-auto px-6">
        <div className="relative rounded-[2rem] bg-[#1F1B18] text-[#FFF8F3] p-10 md:p-14 overflow-hidden text-center">
          <div className="relative">
            <span className="inline-block bg-white/10 text-xs font-bold px-4 py-2 rounded-full mb-6">
              Fique por dentro
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
              Ganhe frete grátis no 1º pedido
            </h2>
            <p className="text-[#FFF8F3]/60 mb-8 max-w-md mx-auto">
              Cadastre seu e-mail e receba o cupom na hora, além de promoções semanais.
            </p>

            {enviado ? (
              <p className="text-[#FF6B35] font-semibold">
                Cadastro feito!
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-5 py-4 rounded-full bg-white/10 border border-white/15 placeholder-[#FFF8F3]/40 focus:outline-none focus:border-[#FF6B35] transition text-sm"
                />
                <button
                  type="submit"
                  className="bg-[#FF6B35] text-white font-semibold hover:cursor-pointer px-8 py-4 rounded-full hover:brightness-110 transition text-sm whitespace-nowrap"
                >
                  Quero meu cupom
                </button>
              </form>
            )}
          </div>
          <p className='pt-8 text-[#FFF8F3]/30 text-sm'>Você também pode entrar em contato enviando mensagem para:<br />contato@gourmeton.com.br</p>
        </div>
      </div>
    </section>
  );
}

export default Contact;