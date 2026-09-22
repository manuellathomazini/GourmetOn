import { useState, useEffect } from 'react';
import pizzaImg from '../assets/pratos/pizza.png';
import hamburguerImg from '../assets/pratos/hamburguer.png';
import japonesaImg from '../assets/pratos/japonesa.png';
import acaiImg from '../assets/pratos/acai.webp';

// 5 Pratos gastronômicos de demonstração para garantir que o layout nunca fique quebrado
const DEMO_DISHES = [
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
];

/**
 * Features / Funcionalidades Component for GourmetOn
 * 
 * - Faz a requisição assíncrona para a API da Spoonacular
 * - Gerencia estados de loading, error e sucesso com useState e useEffect
 * - Possui fallback automático com 5 pratos reais caso a chave da Spoonacular não tenha sido inserida
 * - Permite inserir a chave da API diretamente na tela para testes rápidos
 */
const Features = () => {
  // Lê a chave do .env (VITE_SPOONACULAR_API_KEY) ou usa a chave configurada
  const initialKey = import.meta.env.VITE_SPOONACULAR_API_KEY || '';
  const [apiKey, setApiKey] = useState(initialKey);
  const [inputKey, setInputKey] = useState(initialKey);
  const [showKeyInput, setShowKeyInput] = useState(false);

  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDemoMode, setIsDemoMode] = useState(false);

  const fetchDishes = async (customKey = apiKey) => {
    setLoading(true);
    setError(null);

    // Se a chave não foi definida ou ainda está o placeholder, usa o modo de demonstração
    if (!customKey || customKey === 'YOUR_API_KEY') {
      setTimeout(() => {
        setDishes(DEMO_DISHES);
        setIsDemoMode(true);
        setLoading(false);
      }, 400);
      return;
    }

    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/random?number=5&apiKey=${customKey}`
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Chave de API da Spoonacular inválida ou não autorizada (401).');
        } else if (response.status === 402) {
          throw new Error('Limite gratuito de requisições da Spoonacular atingido (402 Quota Exceeded).');
        } else {
          throw new Error(`Erro na API (${response.status}: ${response.statusText})`);
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
      // Ativa fallback com pratos para o layout não ficar em branco
      setDishes(DEMO_DISHES);
      setIsDemoMode(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDishes(apiKey);
  }, [apiKey]);

  const handleApplyKey = (e) => {
    e.preventDefault();
    if (inputKey.trim()) {
      setApiKey(inputKey.trim());
      setShowKeyInput(false);
    }
  };

  return (
    <section id="funcionalidades" className="py-24 bg-[#1F1B18] text-[#FFF8F3]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-2xl mx-auto mb-10">
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

        {/* Alerta Informativo / Status da API */}
        {isDemoMode && (
          <div className="max-w-3xl mx-auto mb-10 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">💡</span>
              <p>
                <strong>Modo Demonstração ativo:</strong> {error ? error : 'Nenhuma chave da Spoonacular foi inserida ainda.'} Exibindo os 5 pratos do cardápio local.
              </p>
            </div>
            <button
              onClick={() => setShowKeyInput((v) => !v)}
              className="text-xs font-bold bg-amber-500/20 hover:bg-amber-500/30 text-amber-100 px-3.5 py-1.5 rounded-full transition-colors whitespace-nowrap"
            >
              {showKeyInput ? 'Fechar' : 'Configurar Chave da API'}
            </button>
          </div>
        )}

        {/* Formulário retrátil para inserir chave da Spoonacular diretamente na página */}
        {showKeyInput && (
          <form
            onSubmit={handleApplyKey}
            className="max-w-xl mx-auto mb-12 p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg text-center"
          >
            <h4 className="text-sm font-bold text-white mb-2">Inserir Chave da Spoonacular</h4>
            <p className="text-xs text-[#FFF8F3]/60 mb-4">
              Cole sua chave gratuita obtida no site <a href="https://spoonacular.com/food-api" target="_blank" rel="noreferrer" className="text-[#FF6B35] underline">spoonacular.com</a>:
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Ex: 8f4a1b2c3d4e5f6..."
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-full bg-white/10 border border-white/15 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FF6B35]"
              />
              <button
                type="submit"
                className="bg-[#FF6B35] text-white text-xs font-bold px-6 py-2.5 rounded-full hover:brightness-110 transition-all"
              >
                Buscar Pratos
              </button>
            </div>
          </form>
        )}

        {/* 1. Loading State: 5 Skeleton Cards */}
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

        {/* 2. Success / Dishes State: 5 Responsive Cards */}
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

                    {/* Tag de Tempo */}
                    {dish.readyInMinutes && (
                      <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-[#FFF8F3] text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                        ⏱️ {dish.readyInMinutes} min
                      </span>
                    )}
                  </div>

                  {/* Informações */}
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
      </div>
    </section>
  );
};

export default Features;
