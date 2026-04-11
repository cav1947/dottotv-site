import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function buildContactHtml(data: Record<string, string>): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #1565C0; padding: 24px; border-radius: 8px 8px 0 0;">
        <h2 style="color: white; margin: 0; font-size: 20px;">Mesaj nou de contact — DOTTO TV</h2>
      </div>
      <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #666; width: 120px; font-size: 14px;">Nume</td><td style="padding: 8px 0; font-weight: bold; font-size: 14px;">${data.nume}</td></tr>
          <tr><td style="padding: 8px 0; color: #666; font-size: 14px;">Email</td><td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${data.email}" style="color: #1565C0;">${data.email}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #666; font-size: 14px;">Subiect</td><td style="padding: 8px 0; font-weight: bold; font-size: 14px;">${data.subiect}</td></tr>
        </table>
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 16px 0;" />
        <p style="color: #666; font-size: 13px; margin: 0 0 8px;">Mesaj:</p>
        <p style="font-size: 14px; line-height: 1.6; white-space: pre-wrap; margin: 0;">${data.mesaj}</p>
      </div>
    </div>
  `;
}

function buildPublicitateHtml(data: Record<string, string>): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #1565C0; padding: 24px; border-radius: 8px 8px 0 0;">
        <h2 style="color: white; margin: 0; font-size: 20px;">Solicitare publicitate — DOTTO TV</h2>
      </div>
      <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #666; width: 140px; font-size: 14px;">Nume</td><td style="padding: 8px 0; font-weight: bold; font-size: 14px;">${data.nume}</td></tr>
          ${data.companie ? `<tr><td style="padding: 8px 0; color: #666; font-size: 14px;">Companie</td><td style="padding: 8px 0; font-size: 14px;">${data.companie}</td></tr>` : ""}
          <tr><td style="padding: 8px 0; color: #666; font-size: 14px;">Email</td><td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${data.email}" style="color: #1565C0;">${data.email}</a></td></tr>
          ${data.telefon ? `<tr><td style="padding: 8px 0; color: #666; font-size: 14px;">Telefon</td><td style="padding: 8px 0; font-size: 14px;">${data.telefon}</td></tr>` : ""}
          ${data.serviciu ? `<tr><td style="padding: 8px 0; color: #666; font-size: 14px;">Serviciu dorit</td><td style="padding: 8px 0; font-size: 14px;">${data.serviciu}</td></tr>` : ""}
        </table>
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 16px 0;" />
        <p style="color: #666; font-size: 13px; margin: 0 0 8px;">Mesaj:</p>
        <p style="font-size: 14px; line-height: 1.6; white-space: pre-wrap; margin: 0;">${data.mesaj}</p>
      </div>
    </div>
  `;
}

function sanitize(val: unknown): string {
  if (typeof val !== "string") return "";
  return val.replace(/</g, "&lt;").replace(/>/g, "&gt;").slice(0, 2000);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const type: string = body.type ?? "contact";

    if (type === "publicitate") {
      const data = {
        nume: sanitize(body.nume),
        companie: sanitize(body.companie),
        email: sanitize(body.email),
        telefon: sanitize(body.telefon),
        serviciu: sanitize(body.serviciu),
        mesaj: sanitize(body.mesaj),
      };

      if (!data.nume || !data.email || !data.mesaj) {
        return NextResponse.json({ error: "Câmpuri obligatorii lipsă." }, { status: 400 });
      }

      await transporter.sendMail({
        from: `"DOTTO TV Site" <${process.env.SMTP_USER}>`,
        to: ["office@dottotv.ro", "lina.tudor@dottotv.ro"],
        replyTo: data.email,
        subject: `Solicitare publicitate de la ${data.nume}${data.companie ? ` — ${data.companie}` : ""}`,
        html: buildPublicitateHtml(data),
      });
    } else {
      const data = {
        nume: sanitize(body.nume),
        email: sanitize(body.email),
        subiect: sanitize(body.subiect),
        mesaj: sanitize(body.mesaj),
      };

      if (!data.nume || !data.email || !data.subiect || !data.mesaj) {
        return NextResponse.json({ error: "Câmpuri obligatorii lipsă." }, { status: 400 });
      }

      await transporter.sendMail({
        from: `"DOTTO TV Site" <${process.env.SMTP_USER}>`,
        to: "office@dottotv.ro",
        replyTo: data.email,
        subject: `Contact: ${data.subiect} — ${data.nume}`,
        html: buildContactHtml(data),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/contact]", err);
    return NextResponse.json({ error: "Eroare la trimiterea emailului." }, { status: 500 });
  }
}
