import {
  UtensilsCrossed,
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowUp,
} from 'lucide-react'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      id="footer"
      className="bg-neutral-950 text-neutral-400 border-t border-neutral-800 pt-16 pb-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Grid Principal do Rodapé */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-neutral-800">

          {/* Coluna 1: Marca & Propósito */}
          <div className="lg:col-span-4 space-y-5">
            <a
              href="#hero"
              className="inline-flex items-center gap-2.5 group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-200">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight text-white font-serif">
                  Gourmet<span className="text-orange-500">On</span>
                </span>
                <span className="text-[10px] tracking-wider text-neutral-400 font-sans -mt-1 font-medium">
                  Comida boa em casa
                </span>
              </div>
            </a>

            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              Nascemos da vontade de comer bem em casa sem passar raiva com prato frio ou revirado na caixa. Conectamos você aos restaurantes e chefs que nós mesmos amamos frequentar.
            </p>

            {/* Redes Sociais com SVGs Dedicados */}
            <div className="pt-2">
              <span className="block text-xs uppercase tracking-wider text-neutral-500 font-semibold mb-3">
                Acompanhe nossas novidades:
              </span>
              <div className="flex items-center gap-3">
                {/* Instagram */}
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram GourmetOn"
                  className="w-10 h-10 rounded-xl bg-neutral-900 hover:bg-gradient-to-tr hover:from-purple-600 hover:to-orange-500 text-neutral-400 hover:text-white flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 shadow-xs border border-neutral-800 cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook GourmetOn"
                  className="w-10 h-10 rounded-xl bg-neutral-900 hover:bg-blue-600 text-neutral-400 hover:text-white flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 shadow-xs border border-neutral-800 cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/manuella-sousa-thomazini-b88b3b3b3"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn GourmetOn"
                  className="w-10 h-10 rounded-xl bg-neutral-900 hover:bg-blue-700 text-neutral-400 hover:text-white flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 shadow-xs border border-neutral-800 cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube GourmetOn"
                  className="w-10 h-10 rounded-xl bg-neutral-900 hover:bg-red-600 text-neutral-400 hover:text-white flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 shadow-xs border border-neutral-800 cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Coluna 2: Navegação Rápida */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Navegação
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#hero" className="hover:text-orange-400 transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#apresentacao" className="hover:text-orange-400 transition-colors">
                  Diferenciais
                </a>
              </li>
              <li>
                <a href="#funcionalidades" className="hover:text-orange-400 transition-colors">
                  Pratos de Hoje
                </a>
              </li>
              <li>
                <a href="#depoimentos" className="hover:text-orange-400 transition-colors">
                  Avaliações
                </a>
              </li>
              <li>
                <a href="#contato" className="hover:text-orange-400 transition-colors">
                  Fique por dentro
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Informações de Contato */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Canais de Contato
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0" />
                <div>
                  <span className="block text-xs text-neutral-500">E-mail para Atendimento</span>
                  <a
                    href="mailto:contato@gourmeton.com.br"
                    className="hover:text-orange-400 transition-colors text-neutral-300"
                  >
                    contato@gourmeton.com.br
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0" />
                <div>
                  <span className="block text-xs text-neutral-500">Sede Administrativa</span>
                  <span className="text-neutral-300">
                    Av. Paulista - São Paulo, SP
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0" />
                <div>
                  <span className="block text-xs text-neutral-500">Horário do Delivery</span>
                  <span className="text-neutral-300">
                    Todos os dias, das 09h às 23h30
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Termos de Uso e Políticas */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Termos & Segurança
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#termos"
                  onClick={(e) => e.preventDefault()}
                  className="hover:text-orange-400 transition-colors"
                >
                  Termos de Uso da Plataforma
                </a>
              </li>
              <li>
                <a
                  href="#privacidade"
                  onClick={(e) => e.preventDefault()}
                  className="hover:text-orange-400 transition-colors"
                >
                  Política de Privacidade & Cookies
                </a>
              </li>
              <li>
                <a
                  href="#seguranca"
                  onClick={(e) => e.preventDefault()}
                  className="hover:text-orange-400 transition-colors"
                >
                  Segurança da Informação (LGPD)
                </a>
              </li>
              <li>
                <a
                  href="#cancelamento"
                  onClick={(e) => e.preventDefault()}
                  className="hover:text-orange-400 transition-colors"
                >
                  Políticas de Reembolso & Cancelamento
                </a>
              </li>
              <li>
                <a
                  href="#contato"
                  className="hover:text-orange-400 transition-colors text-orange-400 font-medium"
                >
                  Seja um Restaurante Parceiro →
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Rodapé Inferior: Copyright e Botão Voltar ao Topo */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>
            &copy; {new Date().getFullYear()} GourmetOn — Projeto acadêmico FIAP.<br />Manuella Thomazini | Henrique Gumbys | Murillo Dourado | Renan Carlos Bonanno
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer border border-neutral-800"
            aria-label="Voltar ao topo da página"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  )
}

export default Footer