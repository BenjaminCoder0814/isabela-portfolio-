# Regras do projeto — portfólio Isabela Machado

Leia antes de qualquer alteração.

## O que este site é

A página de uma profissional de **Mídia Paga e Performance**. Frase-âncora, que é
o H1 e o eixo de tudo:

> Eu planejo a campanha, produzo o criativo e leio o resultado.

Se um elemento não reforça essa ideia, ele não entra.

**Não é:** portfólio de estudante, portfólio de audiovisual, nem site com tema de
estúdio de TV. Direção estética: agência criativa futurista / laboratório de
performance.

## 1. O site é 100% dark

Nenhuma seção, card, rodapé ou container com fundo claro. Proibido `#F7F8FB`,
`#FFFFFF` ou qualquer background com luminância acima de 15%.

O ritmo entre seções vem de **profundidade + cor de luz**, nunca de claro/escuro:

| seção | fundo | spot |
|---|---|---|
| hero | — (camada global) | key + fill |
| bridge | `bg-100` | rim |
| deliver | `bg-000` | fill |
| process | `bg-100` | key |
| lab | `bg-000` | rim |
| stack | `bg-100` | warm |
| about | `bg-000` | fill |
| contact | `bg-100` | key |
| footer | `bg-000` | — |

Tokens em [app/globals.css](../app/globals.css). Nunca cor hardcoded — use a variável.
Os fundos de seção são `rgba()` de propósito: deixam a grade e os spots aparecerem
por baixo, e `rgba` é mensurável em `getComputedStyle` (`color-mix` não é).

## 2. Não diga que implementou sem implementar

Componente novo precisa renderizar elemento real no DOM (`svg`, `canvas`, `img`).
Gradiente CSS não é ilustração.

Baseline medido na home a 1440px: **32 `<svg>`, 1 `<canvas>`, 2 `<img>`, 0 quebradas.**
Se um PR baixar esses números, algo quebrou.

## 3. Reporte número, não promessa

A cada alteração: `npm run build` e informe erros, warnings de hydration e a
contagem de `<svg>` / `<canvas>` / `<img>` na home.

## 4. Não quebre

Rotas `/pt` `/en` `/es`, botão de PDF, formulário de contato, navegação por âncora.

- `proxy.ts` só decide idioma na raiz. **Não** troque por `createMiddleware` do
  `next-intl`: no Next 16, rodando como `proxy.ts`, ele devolve 404 em tudo.
- Nada de `Date`, `Math.random` ou `performance.now` durante o render — foi o que
  causava o React error #418 no site anterior.

## 5. Todo texto novo existe nos três idiomas

`messages/pt.json`, `en.json`, `es.json` com exatamente as mesmas chaves e arrays
do mesmo tamanho. Nada de string hardcoded em componente.

## 6. Seção "Laboratório" nunca fica vazia

O conteúdo mora em [data/lab.ts](../data/lab.ts). Array vazio => placeholder
premium com borda tracejada, que parece intencional. **Nunca** crie uma seção
"Projetos" que fica vazia.

## Armadilhas já resolvidas — não reintroduza

**CSS fora de layer vence as utilities do Tailwind v4.** Resets de elemento (`a`,
`body`, `html`) ficam em `@layer base`; classes de componente em `@layer components`.
Foi assim que `a { color: inherit }` quebrou todo `text-*` em links.

**Texto pequeno sobre acento.** Branco sobre `--key` dá 3,5:1. Para superfície
preenchida com texto pequeno use `--key-deep`. Para texto em violeta use
`--fill-hi` (`--fill` puro dá 4,45:1).

**Media query em JS causa CLS.** Se o conjunto de elementos renderizados muda
depois da hidratação, o layout salta. Os spotlights escondem os extras por CSS
(`hidden md:block`), não por JS.

**Animação de entrada no elemento de LCP.** A foto do hero não pode partir de
`opacity: 0` — o Chrome só conta o elemento depois que ele pinta.

**framer-motion** entra por `LazyMotion` ([components/motion/MotionProvider.tsx](../components/motion/MotionProvider.tsx)).
Use `m.div`, nunca `motion.div`, senão o bundle inteiro volta para o carregamento inicial.
