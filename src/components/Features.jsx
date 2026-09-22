import { useState, useEffect } from 'react';

/**
 * Features / Funcionalidades Component for GourmetOn
 * 
 * Integração com API Gastronômica Real:
 * - Executa requisições assíncronas reais (HTTP GET) via Fetch API
 * - Sem necessidade de chave de API (100% gratuita, pública e funcional)
 * - Retorna receitas reais com fotos em alta resolução, tempos e porções
 * - Sorteia 5 novos pratos dinamicamente a cada clique no botão
 */
const Features = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Função assíncrona reutilizável que busca 5 pratos reais na API pública
  const fetchDishes = async () => {
    setLoading(true);
    setError(null);

    try {
      // Sorteia um índice inicial aleatório (skip) para trazer 5 pratos diferentes a cada chamada
      const randomSkip = Math.floor(Math.random() * 45);
      const url = `https://dummyjson.com/recipes?limit=5&skip=${randomSkip}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Falha ao conectar à API (Código ${response.status})`);
      }

      const data = await response.json();

      if (data.recipes && Array.isArray(data.recipes)) {
        // Formata os pratos retornados pela API
        const formattedDishes = data.recipes.map((item) => ({
          id: item.id,
          title: item.name || item.title,
          image: item.image,
          readyInMinutes: (item.prepTimeMinutes || 10) + (item.cookTimeMinutes || 15),
          servings: item.servings || 2,
          tag: item.cuisine || (item.tags && item.tags[0]) || 'Gourmet',
        }));

        setDishes(formattedDishes);
      } else {
        throw new Error('A API não retornou a lista de receitas esperada.');
      }
    } catch (err) {
      console.error('Erro na requisição da API:', err);
      setError('Não foi possível carregar os pratos da API online no momento.');
    } finally {
      setLoading(false);
    }
  };

  // 2. Executa a requisição na montagem inicial do componente
  useEffect(() => {
    fetchDishes();
  }, []);

  return (
    <section id="funcionalidades" className="py-24 bg-[#1F1B18] text-[#FFF8F3]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 bg-[#FF6B35]/20 text-[#FF6B35] text-xs font-bold px-4 py-2 rounded-full mb-4">
            ✨ Pratos em Tempo Real
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Sugestões do <span className="text-[#FF6B35]">Chef</span>
          </h2>
          <p className="text-[#FFF8F3]/60 text-base leading-relaxed">
            Descubra receitas e pratos selecionados aleatoriamente em tempo real diretamente da nossa API gastronômica.
          </p>
        </div>

        {/* 1. Estado de Carregamento (Loading): 5 Skeleton Cards animados */}
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

        {/* 2. Estado de Erro (caso o usuário esteja sem internet) */}
        {!loading && error && (
          <div className="max-w-xl mx-auto p-8 rounded-3xl bg-red-500/10 border border-red-500/20 text-center">
            <h3 className="text-xl font-bold text-red-200 mb-2">Erro na Conexão</h3>
            <p className="text-sm text-red-300/80 mb-6">{error}</p>
            <button
              type="button"
              onClick={fetchDishes}
              className="bg-[#FF6B35] text-white text-sm font-semibold px-6 py-3 rounded-full hover:brightness-110 active:scale-95 transition-all shadow-md shadow-[#FF6B35]/25"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {/* 3. Grid com os 5 Pratos Retornados pela API */}
        {!loading && !error && dishes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {dishes.map((dish) => (
              <article
                key={dish.id}
                className="group bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-[#FF6B35]/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#FF6B35]/10 flex flex-col justify-between"
              >
                <div>
                  {/* Imagem do Prato vinda da API */}
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

                  {/* Informações do Prato */}
                  <div className="p-5">
                    <div className="mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF6B35]">
                        {dish.tag}
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
                      {dish.servings} {dish.servings > 1 ? 'porções' : 'porção'}
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

        {/* 4. Botão "Sortear novos pratos" */}
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
                <span>Buscando novos pratos...</span>
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
