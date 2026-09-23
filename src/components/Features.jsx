import { useState, useEffect } from 'react';

/**
 * Features / Funcionalidades Component for GourmetOn
 * 
 * Integração com API Gastronômica Real:
 * - Executa requisições assíncronas reais (HTTP GET) via Fetch API
 * - Sem necessidade de chave de API (100% gratuita, pública e funcional)
 * - Retorna receitas reais com fotos em alta resolução, tempos e porções
 * - Sorteia 4 novos pratos dinamicamente a cada clique no botão
 */
const Features = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null); // Controla qual card está expandido

  const fetchDishes = async () => {
    setLoading(true);
    setError(null);

    try {
      const randomSkip = Math.floor(Math.random() * 45);
      const url = `https://dummyjson.com/recipes?limit=4&skip=${randomSkip}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Falha ao conectar à API (Código ${response.status})`);
      }

      const data = await response.json();

      if (data.recipes && Array.isArray(data.recipes)) {
        const formattedDishes = data.recipes.map((item) => ({
          id: item.id,
          title: item.name || item.title,
          image: item.image,
          readyInMinutes: (item.prepTimeMinutes || 10) + (item.cookTimeMinutes || 15),
          servings: item.servings || 2,
          tag: item.cuisine || (item.tags && item.tags[0]) || 'Gourmet',
          ingredients: item.ingredients || [],
          instructions: item.instructions || [],
          difficulty: item.difficulty || 'Médio',
          rating: item.rating || 0,
        }));

        setDishes(formattedDishes);
        setExpandedId(null); // Limpa expansão anterior
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

  useEffect(() => {
    fetchDishes();
  }, []);

  return (
    <section id="funcionalidades" className="py-24 bg-[#1F1B18] text-[#FFF8F3]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 bg-[#FF6B35]/20 text-[#FF6B35] text-xs font-bold px-4 py-2 rounded-full mb-4">
            Pratos em Tempo Real
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Sugestões do <span className="text-[#FF6B35]">Chef</span>
          </h2>
          <p className="text-[#FFF8F3]/60 text-base leading-relaxed">
            Descubra as mais diversas comidas presentes em nosso aplicativo, onde você poderá filtrar pelos seus tipos de pratos <span className='text-[#FF6B35] font-extrabold'>favoritos</span>.
          </p>
        </div>

        {/* Estado de Carregamento */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
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

        {/* Estado de Erro */}
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

        {/* Grid com os Pratos */}
        {!loading && !error && dishes.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {dishes.map((dish) => (
              <article
                key={dish.id}
                className={`bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-[#FF6B35]/50 transition-all duration-300 flex flex-col ${expandedId === dish.id ? 'lg:col-span-2' : ''
                  }`}
              >
                {/* Card Normal */}
                <div className="flex flex-col md:flex-row">
                  {/* Imagem */}
                  <div className="relative w-full md:w-64 h-44 md:h-auto flex-shrink-0 overflow-hidden bg-white/5">
                    {dish.image ? (
                      <img
                        src={dish.image}
                        alt={dish.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">
                        🍲
                      </div>
                    )}

                    {dish.readyInMinutes && (
                      <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-[#FFF8F3] text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                        ⏱️ {dish.readyInMinutes} min
                      </span>
                    )}
                  </div>

                  {/* Informações Básicas */}
                  <div className="flex-1 p-5 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF6B35]">
                        {dish.tag}
                      </span>
                      <h3 className="font-bold text-xl leading-snug text-[#FFF8F3] mt-2 mb-3">
                        {dish.title}
                      </h3>

                      {/* Rating e Dificuldade */}
                      <div className="flex items-center gap-4 text-sm text-[#FFF8F3]/70 mb-4">
                        {dish.rating > 0 && (
                          <span>⭐ {dish.rating.toFixed(1)}</span>
                        )}
                        <span>Dificuldade: {dish.difficulty}</span>
                      </div>
                    </div>

                    {/* Rodapé */}
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <span className="text-xs text-[#FFF8F3]/50">
                        {dish.servings} {dish.servings > 1 ? 'porções' : 'porção'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setExpandedId(expandedId === dish.id ? null : dish.id)}
                        className="text-xs font-bold text-[#FF6B35] hover:text-white transition-colors"
                      >
                        {expandedId === dish.id ? 'Esconder' : 'Ver receita'} →
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expansão com Ingredientes e Modo de Preparo */}
                {expandedId === dish.id && (
                  <div className="border-t border-white/10 p-6 space-y-6 bg-white/2">
                    {/* Ingredientes */}
                    <div>
                      <h4 className="font-bold text-lg text-[#FF6B35] mb-4">Ingredientes</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {dish.ingredients && dish.ingredients.length > 0 ? (
                          dish.ingredients.map((ingredient, index) => (
                            <li key={index} className="flex items-start gap-2 text-[#FFF8F3]/80">
                              <span className="text-[#FF6B35] mt-1">•</span>
                              <span>{ingredient}</span>
                            </li>
                          ))
                        ) : (
                          <p className="text-[#FFF8F3]/60">Sem ingredientes listados</p>
                        )}
                      </ul>
                    </div>

                    {/* Modo de Preparo */}
                    <div>
                      <h4 className="font-bold text-lg text-[#FF6B35] mb-4">Modo de Preparo</h4>
                      <ol className="space-y-3">
                        {dish.instructions && dish.instructions.length > 0 ? (
                          dish.instructions.map((instruction, index) => (
                            <li key={index} className="flex gap-3 text-[#FFF8F3]/80">
                              <span className="font-bold text-[#FF6B35] flex-shrink-0">
                                {index + 1}.
                              </span>
                              <span>{instruction}</span>
                            </li>
                          ))
                        ) : (
                          <p className="text-[#FFF8F3]/60">Sem instruções listadas</p>
                        )}
                      </ol>
                    </div>

                    {/* Botão de Ação */}
                    <button className="w-full bg-[#FF6B35] hover:bg-[#E8542A] text-white font-bold py-3 rounded-full transition-colors mt-4">
                      Pedir agora
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}

        {/* Botão Sortear */}
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
                <span>Ver outras opções</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;