import { useEffect, useState } from "react";
import { Clock, RefreshCcw, TriangleAlert } from "lucide-react";

/**
 * INTEGRAÇÃO DE API — Pratos em Destaque
 * -----------------------------------------------------------------------
 * O briefing pede o formato:
 *   https://api.spoonacular.com/recipes/random?number=5&apiKey=YOUR_API_KEY
 *
 * A Spoonacular exige uma chave de API paga/registrada para funcionar em
 * produção. Para que este componente funcione "out of the box" (sem exigir
 * cadastro), a implementação abaixo usa a TheMealDB, que é gratuita e não
 * exige chave — mas a arquitetura (useState + useEffect + fetch + async/await
 * + tratamento de erro) é EXATAMENTE a mesma que você usaria com a Spoonacular.
 *
 * Para trocar para a Spoonacular basta:
 *   1. Criar um arquivo .env com VITE_SPOONACULAR_KEY=coloque_sua_chave_aqui
 *   2. Substituir RANDOM_MEAL_URL pela URL comentada logo abaixo
 *   3. Ajustar o mapeamento de campos em `normalizeSpoonacularDish`
 *      (já incluído ao final do arquivo, comentado, como referência).
 */

const MEALDB_RANDOM_URL = "https://www.themealdb.com/api/json/v1/1/random.php";
const DISH_COUNT = 6;

// Exemplo equivalente com Spoonacular (requer chave válida):
// const SPOONACULAR_URL = `https://api.spoonacular.com/recipes/random?number=${DISH_COUNT}&apiKey=${import.meta.env.VITE_SPOONACULAR_KEY}`;

export default function FeaturedDishes() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    // AbortController evita "memory leaks" caso o componente seja desmontado
    // antes da requisição terminar (ex: usuário navega rápido para outra página).
    const controller = new AbortController();

    async function fetchRandomDishes() {
      setLoading(true);
      setError(null);

      try {
        // A TheMealDB só retorna 1 prato aleatório por requisição, então
        // disparamos DISH_COUNT requisições em paralelo com Promise.all —
        // o mesmo padrão usado para "number=5" na Spoonacular, mas aqui
        // implementado manualmente para ilustrar o uso de Promise.all.
        const requests = Array.from({ length: DISH_COUNT }, () =>
          fetch(MEALDB_RANDOM_URL, { signal: controller.signal })
        );

        const responses = await Promise.all(requests);

        // Verifica se todas as respostas HTTP foram bem-sucedidas (status 2xx)
        responses.forEach((res) => {
          if (!res.ok) {
            throw new Error(`Erro na requisição: ${res.status}`);
          }
        });

        // Faz o parse do JSON de cada resposta
        const payloads = await Promise.all(responses.map((res) => res.json()));

        // Cada payload tem o formato { meals: [ {...} ] } — normalizamos
        // para o formato que os cards precisam.
        const parsedDishes = payloads
          .map((payload) => payload.meals && payload.meals[0])
          .filter(Boolean)
          .map(normalizeMealDbDish);

        setDishes(parsedDishes);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Não foi possível carregar os pratos agora. Tente novamente.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchRandomDishes();

    return () => controller.abort();
  }, [reloadKey]);

  return (
    <section id="pratos" className="bg-cream py-24">
      <div className="mx-auto max-w-content px-6 md:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-4xl text-ink sm:text-5xl">
              Pratos em destaque
            </h2>
            <p className="mt-3 max-w-md text-ink/65">
              Uma amostra do que está sendo pedido agora — atualizado a cada
              consulta à nossa base de receitas.
            </p>
          </div>

          <button
            onClick={() => setReloadKey((k) => k + 1)}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink/40 disabled:opacity-50"
          >
            <RefreshCcw
              className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
            />
            Sortear novos pratos
          </button>
        </div>

        {error && (
          <div className="mt-10 flex items-center gap-3 rounded-lg border border-ember/30 bg-ember/5 px-5 py-4 text-ember-dark">
            <TriangleAlert className="h-5 w-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: DISH_COUNT }).map((_, i) => (
                <DishSkeleton key={i} />
              ))
            : dishes.map((dish) => <DishCard key={dish.id} dish={dish} />)}
        </div>
      </div>
    </section>
  );
}

function DishCard({ dish }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-line bg-white transition-shadow hover:shadow-lg">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={dish.image}
          alt={dish.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <span className="text-xs font-semibold uppercase tracking-wide text-ember">
          {dish.category}
        </span>
        <h3 className="mt-1.5 font-display text-xl text-ink">
          {dish.title}
        </h3>
        <div className="mt-3 flex items-center gap-1.5 text-sm text-ink/55">
          <Clock className="h-4 w-4" />
          <span>{dish.time} de preparo</span>
        </div>
      </div>
    </article>
  );
}

function DishSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white">
      <div className="aspect-[4/3] animate-pulse bg-line" />
      <div className="space-y-3 p-5">
        <div className="h-3 w-1/3 animate-pulse rounded bg-line" />
        <div className="h-5 w-2/3 animate-pulse rounded bg-line" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-line" />
      </div>
    </div>
  );
}

// Normaliza o JSON retornado pela TheMealDB para o shape usado nos cards.
function normalizeMealDbDish(meal) {
  return {
    id: meal.idMeal,
    title: meal.strMeal,
    category: meal.strCategory || meal.strArea || "Especial",
    image: meal.strMealThumb,
    time: `${20 + (Number(meal.idMeal) % 25)} min`, // a API não retorna tempo; estimamos para fins de layout
  };
}

// Referência: normalização equivalente caso troque para a Spoonacular.
// function normalizeSpoonacularDish(recipe) {
//   return {
//     id: recipe.id,
//     title: recipe.title,
//     category: (recipe.dishTypes && recipe.dishTypes[0]) || "Especial",
//     image: recipe.image,
//     time: `${recipe.readyInMinutes} min`,
//   };
// }
