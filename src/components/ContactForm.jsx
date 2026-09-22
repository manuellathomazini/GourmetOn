import { useState } from "react";
import { Send, CircleCheck } from "lucide-react";

export default function ContactForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  function handleSubmit(e) {
    e.preventDefault();

    if (!email.includes("@")) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    // Simulação de envio para uma API de marketing (ex.: Mailchimp/RD Station).
    // Substitua este setTimeout por uma chamada fetch real, por exemplo:
    // await fetch("/api/subscribe", { method: "POST", body: JSON.stringify({ email }) })
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 900);
  }

  return (
    <section id="contato" className="bg-charcoal py-24 text-cream">
      <div className="mx-auto max-w-content px-6 md:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-4xl sm:text-5xl">
            Não fique de fora das próximas novidades.
          </h2>
          <p className="mt-4 text-cream/65">
            Deixe seu e-mail e receba cupons, lançamentos de restaurantes
            parceiros e promoções exclusivas do GourmetOn.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            noValidate
          >
            <label htmlFor="email" className="sr-only">
              Seu e-mail
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status !== "idle") setStatus("idle");
              }}
              className="w-full rounded-full border border-cream/20 bg-cream/5 px-5 py-3.5 text-cream placeholder:text-cream/40 focus:border-ember focus:outline-none focus:ring-1 focus:ring-ember"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ember px-6 py-3.5 font-semibold text-cream transition-colors hover:bg-ember-dark disabled:opacity-60"
            >
              {status === "loading" ? (
                "Enviando..."
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Quero receber
                </>
              )}
            </button>
          </form>

          <div className="mt-3 h-5 text-sm">
            {status === "success" && (
              <p className="flex items-center justify-center gap-1.5 text-herb">
                <CircleCheck className="h-4 w-4" />
                Cadastro confirmado! Fique de olho no seu e-mail.
              </p>
            )}
            {status === "error" && (
              <p className="text-ember">Digite um e-mail válido.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
