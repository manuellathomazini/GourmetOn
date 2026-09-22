import pizza from '../assets/pratos/pizza.png'
import japonesa from '../assets/pratos/japonesa.png'
import hamburguer from '../assets/pratos/hamburguer.png'
import acai from '../assets/pratos/acai.webp'
import GetAppIcon from '@mui/icons-material/GetApp';
import StarIcon from '@mui/icons-material/Star';

const abrirLink = () => {
  window.open("https://play.google.com/store/apps", "_blank");
};

function Hero() {
  return (
    <section id="hero" className="relative min-h-[88vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 opacity-70 bg-gradient-to-br from-orange-200 to-purple-300"
      />
      <div className="absolute inset-0" />

      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <div className="absolute top-32 left-16 w-24 h-24 rounded-3xl bg-gradient-to-br from-[#E63946] to-[#FF8C61] flex items-center justify-center text-4xl rotate-12 opacity-90">
          <img src={pizza} alt="Pizza" className="w-full h-full object-cover" />
        </div>
        <div className="absolute bottom-32 left-32 w-20 h-20 rounded-3xl bg-gradient-to-br from-[#2A9D8F] to-[#8AC926] flex items-center justify-center text-3xl -rotate-6 opacity-90">
          <img src={japonesa} alt="Comida Japonesa" className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-40 right-20 w-24 h-24 rounded-3xl bg-gradient-to-br from-[#F4A261] to-[#FFD166] flex items-center justify-center text-4xl -rotate-12 opacity-90">
          <img src={hamburguer} alt="Burguer" className="w-full h-full object-cover" />
        </div>
        <div className="absolute bottom-28 right-36 w-20 h-20 rounded-3xl bg-gradient-to-br from-[#6D597A] to-[#B56576] flex items-center justify-center text-3xl rotate-6 opacity-90">
          <img src={acai} alt="Açaí" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-3xl py-28">
        <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/15 text-xs font-bold px-4 py-2 rounded-full mb-8">
          🛵 Entrega média de 30 minutos
        </span>

        <h1 className="text-5xl md:text-7xl font-black leading-[1.02] mb-6">
          Fome agora?<br />A gente resolve.
        </h1>

        <p className="text-lg mb-10 max-w-lg mx-auto">
          2.000 restaurantes, do japonês ao açaí. Digite seu endereço e veja o que chega rápido até você.
        </p>

        <button className='border border border-white/10 rounded-[2.5rem] p-3 shadow-2xl bg-amber-900/30 hover:cursor-pointer hover:bg-amber-900/60 transition' onClick={abrirLink}>Baixar agora <GetAppIcon /></button>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-10 text-xs font-semibold">
          <span className='flex items-center'><StarIcon fontSize='' /> 4.9 na App Store</span>
          <span>+180 mil downloads</span>
          <span>Frete grátis no 1º pedido</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;