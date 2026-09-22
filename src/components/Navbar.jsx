import { useEffect, useState } from "react";
import { Utensils, Menu, X } from "lucide-react";

const LINKS = [
  { label: "Início", href: "#hero" },
  { label: "Benefícios", href: "#beneficios" },
  { label: "Funcionalidades", href: "#funcionalidades" },
  { label: "Cardápio", href: "#pratos" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Contato", href: "#contato" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // A opacidade/estado do menu muda conforme o scroll da página.
  // Usamos um listener de scroll com um threshold simples (24px) para
  // alternar entre o estado "transparente" (topo do hero) e "sólido".
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // garante o estado correto caso a página recarregue com scroll

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setOpen(false);
    // O scroll suave em si é feito via CSS (scroll-behavior: smooth, no index.css),
    // então basta deixar o navegador tratar o <a href="#id">.
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-charcoal/95 backdrop-blur-sm shadow-[0_1px_0_rgba(255,255,255,0.08)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-content mx-auto px-6 md:px-8 h-20 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2 text-cream">
          <Utensils className="w-5 h-5 text-ember" strokeWidth={2.2} />
          <span className="font-display text-xl tracking-tight">GourmetOn</span>
        </a>

        <ul className="hidden md:flex items-center gap-8 font-body text-sm text-cream/85">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className="relative py-1 transition-colors hover:text-cream after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-ember after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contato"
          className="hidden md:inline-flex items-center rounded-full bg-ember px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-ember-dark"
        >
          Baixar app
        </a>

        <button
          className="md:hidden text-cream"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Menu mobile */}
      {open && (
        <div className="md:hidden bg-charcoal/98 backdrop-blur-sm border-t border-white/10">
          <ul className="flex flex-col px-6 py-4 gap-4 font-body text-cream/90">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => handleNavClick(link.href)}>
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contato"
                onClick={() => setOpen(false)}
                className="inline-flex items-center rounded-full bg-ember px-5 py-2.5 text-sm font-semibold text-cream"
              >
                Baixar app
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
