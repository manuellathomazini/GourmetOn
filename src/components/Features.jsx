import { useState, useEffect } from 'react';
import pizzaImg from '../assets/pratos/pizza.png';
import hamburguerImg from '../assets/pratos/hamburguer.png';
import japonesaImg from '../assets/pratos/japonesa.png';
import acaiImg from '../assets/pratos/acai.webp';

// Banco de pratos para demonstração (garante que mesmo sem chave da API o layout funcione e sorteie pratos diferentes)
const DEMO_POOL = [
  {
    id: 1,
    title: 'Pizza Margherita Especial com Manjericão Fresco',
    image: pizzaImg,
    readyInMinutes: 30,
    servings: 4,
    vegetarian: true,
  },
  {
    id: 2,
    title: 'Hambúrguer Gourmet Artesanal com Queijo Cheddar',
    image: hamburguerImg,
    readyInMinutes: 25,
    servings: 1,
    vegetarian: false,
  },
  {
    id: 3,
    title: 'Combinado Premium de Sushis e Sashimis Frescos',
    image: japonesaImg,
    readyInMinutes: 35,
    servings: 2,
    glutenFree: true,
  },
  {
    id: 4,
    title: 'Bowl de Açaí Cremoso com Frutas e Granola Artesanal',
    image: acaiImg,
    readyInMinutes: 15,
    servings: 1,
    vegan: true,
  },
  {
    id: 5,
    title: 'Risoto de Cogumelos Selvagens ao Azeite Trufado',
    image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=600&q=80',
    readyInMinutes: 40,
    servings: 2,
    vegetarian: true,
  },
  {
    id: 6,
    title: 'Salmão Grelhado com Aspargos e Ervas Finas',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80',
    readyInMinutes: 28,
    servings: 2,
    glutenFree: true,
  },
  {
    id: 7,
    title: 'Pasta Carbonara Autêntica com Parmesão e Guanciale',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=600&q=80',
    readyInMinutes: 20,
    servings: 2,
    vegetarian: false,
  },
  {
    id: 8,
    title: 'Tacos Crocantes com Guacamole e Pico de Gallo',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80',
    readyInMinutes: 22,
    servings: 3,
    glutenFree: true,
  },
];

/**
 * Features / Funcionalidades Component for GourmetOn
 * 
 * - Função assíncrona reutilizável `fetchDishes` para busca de 5 pratos aleatórios
 * - Execução no carregamento inicial (`useEffect`)
 * - Botão "Sortear novos pratos" abaixo dos cards que dispara nova requisição
 * - Exibição de indicador de carregamento (skeletons e spinner) durante a busca
 * - Fallback inteligente de demonstração caso a chave da Spoonacular não esteja definida
 */
const Features = () => {
  const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY || 'YOUR_API_KEY';

  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Função assíncrona reutilizável para buscar pratos da API ou sortear novos pratos
  const fetchDishes = async () => {
    // Ativa o estado de carregamento imediatamente ao iniciar a busca/sorteio
    setLoading(true);
    setError(null);

    // Modo demonstração se a chave for o placeholder ou não existir
    if (!API_KEY || API_KEY === 'YOUR_API_KEY') {
      setTimeout(() => {
        // Embaralha o pool e seleciona 5 pratos aleatórios
        const shuffled = [...DEMO_POOL].sort(() => 0.5 - Math.random()).slice(0, 5);
        setDishes(shuffled);
        setIsDemoMode(true);
        setLoading(false);
      }, 600);
      return;
    }

    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/random?number=5&apiKey=${API_KEY}`
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Chave de API inválida ou não configurada (401).');
        } else if (response.status === 402) {
          throw new Error('Limite gratuito de requisições da Spoonacular atingido (402).');
        } else {
          throw new Error(`Falha na requisição (${response.status}: ${response.statusText})`);
        }
      }

      const data = await response.json();

      if (data.recipes && Array.isArray(data.recipes)) {
        setDishes(data.recipes);
        setIsDemoMode(false);
      } else {
        throw new Error('Formato inesperado retornado pela API.');
      }
    } catch (err) {
      console.warn('Spoonacular fetch error:', err.message);
      setError(err.message);
      // Em caso de erro na API externa, exibe 5 pratos do cardápio demonstrativo
      const shuffled = [...DEMO_POOL].sort(() => 0.5 - Math.random()).slice(0, 5);
      setDishes(shuffled);
      setIsDemoMode(true);
    } finally {
      setLoading(false);
    }
  };

  // Dispara a busca inicial na montagem do componente
  useEffect(() => {
    fetchDishes();
  }, []);

  return (
    <section id="funcionalidades" className="py-24 bg-[#1F1B18] text-[#FFF8F3]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 bg-[#FF6B35]/20 text-[#FF6B35] text-xs font-bold px-4 py-2 rounded-full mb-4">
            ✨ Pratos em Destaque
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Sugestões do <span className="text-[#FF6B35]">Chef</span>
          </h2>
          <p className="text-[#FFF8F3]/60 text-base leading-relaxed">
            Descubra receitas e pratos selecionados aleatoriamente em tempo real diretamente da nossa API gastronômica.
          </p>
        </div>

        {/* Aviso de Modo Demonstração (caso nenhuma chave Spoonacular esteja no .env) */}
        {isDemoMode && !loading && (
          <div className="max-w-2xl mx-auto mb-8 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs text-center">
            💡 <strong>Modo Demonstração:</strong> Exibindo 5 pratos selecionados aleatoriamente do cardápio local. (Configure <code>VITE_SPOONACULAR_API_KEY</code> no seu arquivo <code>.env</code> para conectar à API externa).
          </div>
        )}

        {/* 1. Estado de Carregamento: 5 Skeleton Cards */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="bg-white/5 rounded-3xl overflow-hidden border border-white/10 animate-pulse flex flex-col"
              >
                <div className="h-44 bg-white/10 w-full" />
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="h-4 bg-white/20 rounded w-3/4" />
                    <div className="h-3 bg-white/10 rounded w-1/2" />
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <div className="h-3 bg-white/10 rounded w-1/3" />
                    <div className="h-8 bg-white/15 rounded-full w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. Grid de Cards com os 5 Pratos Recebidos */}
        {!loading && dishes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {dishes.map((dish) => (
              <article
                key={dish.id}
                className="group bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-[#FF6B35]/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#FF6B35]/10 flex flex-col justify-between"
              >
                <div>
                  {/* Imagem do Prato */}
                  <div className="relative h-44 w-full overflow-hidden bg-white/5">
                    {dish.image ? (
                      <img
                        src={dish.image}
                        alt={dish.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">
                        🍲
                      </div>
                    )}

                    {/* Badge de Tempo de Preparo */}
                    {dish.readyInMinutes && (
                      <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-[#FFF8F3] text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                        ⏱️ {dish.readyInMinutes} min
                      </span>
                    )}
                  </div>

                  {/* Informações do Prato */}
                  <div className="p-5">
                    <div className="mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF6B35]">
                        {dish.vegetarian
                          ? 'Vegetariano'
                          : dish.vegan
                            ? 'Vegano'
                            : dish.glutenFree
                              ? 'Sem Glúten'
                              : 'Prato do Dia'}
                      </span>
                    </div>

                    <h3
                      className="font-bold text-base leading-snug line-clamp-2 text-[#FFF8F3] group-hover:text-[#FF6B35] transition-colors"
                      title={dish.title}
                    >
                      {dish.title}
                    </h3>
                  </div>
                </div>

                {/* Rodapé do Card */}
                <div className="px-5 pb-5 pt-0">
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-[#FFF8F3]/50">
                      {dish.servings ? `${dish.servings} porções` : '1 porção'}
                    </span>
                    <a
                      href="#contato"
                      className="text-xs font-bold text-[#FF6B35] hover:text-white transition-colors"
                    >
                      Pedir agora →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* 3. Botão "Sortear novos pratos" com estado de Loading e Tailwind CSS */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={fetchDishes}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2.5 bg-[#FF6B35] hover:bg-[#E8542A] text-white text-sm sm:text-base font-bold px-8 py-4 rounded-full shadow-lg shadow-[#FF6B35]/25 hover:shadow-[#FF6B35]/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                <span>Sorteando novos pratos...</span>
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span>Sortear novos pratos</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;
