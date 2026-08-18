This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Deploy na Vercel

1. **Import Project** → escolha o repositório. A Vercel detecta Next.js sozinha;
   não precisa mudar build command nem output directory.
2. **Environment Variables** — defina antes do primeiro deploy:

   | Variável | Obrigatória | Para quê |
   |---|---|---|
   | `NEXT_PUBLIC_SITE_URL` | sim | `og:image`, `metadataBase` e JSON-LD. Sem ela o link compartilhado sai sem imagem |
   | `RESEND_API_KEY` | não | Envio do formulário pelo servidor. Sem ela, o formulário abre o app de e-mail do visitante |
   | `CONTACT_TO_EMAIL` | não | Destino da mensagem (padrão: isam250500@gmail.com) |
   | `CONTACT_FROM_EMAIL` | não | Remetente, de domínio verificado no Resend |

3. Depois de apontar um domínio próprio, **atualize `NEXT_PUBLIC_SITE_URL`
   e refaça o deploy** — essa variável entra no HTML em build time.

### Contato — onde os dados moram

Telefone, e-mail e redes ficam em [`components/sections/Contact.tsx`](components/sections/Contact.tsx),
exportados como constantes e reaproveitados pelo rodapé:

- `PHONE_DIGITS` — só dígitos, formato exigido pelo `wa.me`
- `PHONE_DISPLAY` — como aparece na tela
- `PHONE_E164` — usado no link `tel:`
- `waLink(mensagem)` — monta o link do WhatsApp com a mensagem já escrita

O texto da mensagem fica em `contact.whatsappMessage` nos três arquivos de
`messages/`, então o visitante abre o WhatsApp já no idioma dele.
O telefone também entra no JSON-LD em [`lib/personSchema.ts`](lib/personSchema.ts).
