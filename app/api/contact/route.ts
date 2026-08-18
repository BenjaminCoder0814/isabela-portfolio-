import { NextResponse } from "next/server";

export const runtime = "nodejs";

const TO = process.env.CONTACT_TO_EMAIL ?? "isam250500@gmail.com";
const FROM = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";
const KEY = process.env.RESEND_API_KEY;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Body = { name?: string; email?: string; message?: string; company?: string };

export async function POST(request: Request) {
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  // honeypot — bot preencheu um campo que humano não vê
  if (body.company) return NextResponse.json({ ok: true });

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();

  const fields: string[] = [];
  if (name.length < 2) fields.push("name");
  if (!EMAIL_RE.test(email)) fields.push("email");
  if (message.length < 10) fields.push("message");
  if (message.length > 5000) fields.push("message");
  if (fields.length) {
    return NextResponse.json({ ok: false, error: "invalid", fields }, { status: 422 });
  }

  // Sem chave configurada o cliente cai para mailto — melhor do que fingir envio.
  if (!KEY) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 501 });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email,
        subject: `[Portfólio] ${name}`,
        text: `${message}\n\n—\n${name} <${email}>`,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[contact] provider error", res.status, detail);
      return NextResponse.json({ ok: false, error: "provider" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] network error", err);
    return NextResponse.json({ ok: false, error: "network" }, { status: 502 });
  }
}
