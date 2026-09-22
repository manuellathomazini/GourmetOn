function Footer() {
  return (
    <footer className="bg-[#FFF8F3] border-t border-[#1F1B18]/10 py-14">
      <div className="flex justify-center gap-50">
        <div>
          <p className="text-xl font-extrabold mb-3">
            Gourmet<span className="text-[#FF6B35]">On</span>
          </p>
          <p className="text-sm text-[#1F1B18]/60">Comida boa, rápida e sem complicação.</p>
        </div>

        <div>
          <p className="font-bold mb-3 text-sm">Contato</p>
          <ul className="space-y-2 text-sm text-[#1F1B18]/60">
            <li>contato@gourmeton.com.br</li>
            <li>(11) xxxx-8922</li>
            <li>São Paulo, SP</li>
          </ul>
        </div>

        <div>
          <p className="font-bold mb-3 text-sm">Redes sociais</p>
          <ul className="space-y-2 text-sm text-[#1F1B18]/60">
            <li>Instagram: gourmeton_oficial</li>
            <li>TikTok: gourmeton_oficial</li>
            <li>LinkedIn: Gourmet On Delivery</li>
          </ul>
        </div>
      </div>

      <p className="text-center text-xs text-[#1F1B18]/40 mt-12">
        © 2026 GourmetOn — Projeto acadêmico FIAP.<br/>Manuella Thomazini | Henrique Gumbys | Murillo Dourado | Renan Carlos Bonanno
      </p>
    </footer>
  );
}

export default Footer;