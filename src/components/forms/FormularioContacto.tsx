"use client";

import { useEffect, useRef, useState, type FocusEvent, type FormEvent } from "react";
import { formularioDestino, sitio } from "@/lib/sitio";

const intereses = ["Comprar", "Arrendar", "Vender o arrendar mi inmueble", "Servicios de construcción", "Otro"];

const mensajesError: Record<string, string> = {
  nombre: "Escribe tu nombre.",
  telefono: "Escribe un teléfono de 7 a 15 dígitos.",
  correo: "Escribe un correo válido, por ejemplo nombre@correo.com.",
  interes: "Elige una opción.",
  mensaje: "Cuéntanos en pocas palabras qué buscas.",
};

type Estado = "listo" | "enviando" | "enviado" | "error";

export function FormularioContacto() {
  const form = useRef<HTMLFormElement>(null);
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [estado, setEstado] = useState<Estado>("listo");

  useEffect(() => {
    const valor = new URLSearchParams(window.location.search).get("inmueble");
    const campo = form.current?.querySelector<HTMLInputElement>("#inmueble");
    if (valor && campo && !campo.value) campo.value = valor;
  }, []);

  function validar(el: HTMLInputElement | HTMLTextAreaElement) {
    const msg = el.validity.valid ? "" : mensajesError[el.name] ?? "Revisa este campo.";
    setErrores((e) => ({ ...e, [el.name]: msg }));
    return !msg;
  }

  function alSalir(e: FocusEvent<HTMLFormElement>) {
    const el = e.target as unknown as HTMLInputElement;
    if (!("validity" in el) || !el.name || el.type === "radio") return;
    if (el.value || errores[el.name]) validar(el);
  }

  function alEscribir(e: FormEvent<HTMLFormElement>) {
    const el = e.target as unknown as HTMLInputElement;
    if (el.name && errores[el.name] && el.validity.valid) setErrores((x) => ({ ...x, [el.name]: "" }));
  }

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = form.current!;
    const campos = [...f.querySelectorAll<HTMLInputElement>("input[name]:not([type=hidden]):not([name=_honey]), textarea[name]")];
    const nuevos: Record<string, string> = {};
    for (const c of campos) {
      if (c.type === "radio") continue;
      if (!c.validity.valid) nuevos[c.name] = mensajesError[c.name] ?? "Revisa este campo.";
    }
    if (!f.querySelector<HTMLInputElement>("input[name=interes]:checked")) nuevos.interes = mensajesError.interes;
    setErrores(nuevos);
    const primero = Object.keys(nuevos)[0];
    if (primero) {
      f.querySelector<HTMLElement>(`[name="${primero}"]`)?.focus();
      return;
    }
    const datos = new FormData(f);
    if (datos.get("_honey")) return;
    datos.set("_replyto", String(datos.get("correo") ?? ""));
    setEstado("enviando");
    try {
      const r = await fetch(formularioDestino, { method: "POST", body: datos, headers: { Accept: "application/json" } });
      const j = (await r.json().catch(() => ({}))) as { success?: string | boolean };
      if (!r.ok || String(j.success) === "false") throw new Error("envio");
      setEstado("enviado");
      f.reset();
    } catch {
      setEstado("error");
    }
  }

  const err = (n: string) => (errores[n] ? { "aria-invalid": true as const, "aria-describedby": `${n}-error` } : {});

  return (
    <form ref={form} className="contacto__form" onSubmit={enviar} onBlur={alSalir} onInput={alEscribir} noValidate aria-labelledby="form-h">
      <h2 id="form-h">Cuéntanos qué inmueble buscas</h2>
      <input type="hidden" name="_subject" value="Nueva solicitud desde el sitio web de Evolve" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <div className="visually-hidden" aria-hidden="true">
        <label htmlFor="honey">No llenar</label>
        <input id="honey" type="text" name="_honey" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="field">
        <label htmlFor="nombre">Nombre completo</label>
        <input id="nombre" name="nombre" autoComplete="name" required {...err("nombre")} />
        {errores.nombre ? <p id="nombre-error" className="field-error">{errores.nombre}</p> : null}
      </div>
      <div className="contacto__fila">
        <div className="field">
          <label htmlFor="telefono">Teléfono o WhatsApp</label>
          <input id="telefono" name="telefono" type="tel" inputMode="tel" autoComplete="tel" pattern="[0-9 +()-]{7,20}" required {...err("telefono")} />
          {errores.telefono ? <p id="telefono-error" className="field-error">{errores.telefono}</p> : null}
        </div>
        <div className="field">
          <label htmlFor="correo">Correo</label>
          <input id="correo" name="correo" type="email" autoComplete="email" autoCapitalize="none" spellCheck={false} required {...err("correo")} />
          {errores.correo ? <p id="correo-error" className="field-error">{errores.correo}</p> : null}
        </div>
      </div>
      <fieldset className="field contacto__interes" {...(errores.interes ? { "aria-describedby": "interes-error" } : {})}>
        <legend>¿Qué te interesa?</legend>
        <div className="contacto__opciones">
          {intereses.map((i) => (
            <label key={i} className="contacto__opcion">
              <input type="radio" name="interes" value={i} onChange={() => setErrores((x) => ({ ...x, interes: "" }))} />
              <span>{i}</span>
            </label>
          ))}
        </div>
        {errores.interes ? <p id="interes-error" className="field-error">{errores.interes}</p> : null}
      </fieldset>
      <div className="field">
        <label htmlFor="inmueble">Inmueble o zona de interés (opcional)</label>
        <input id="inmueble" name="inmueble" autoComplete="off" />
      </div>
      <div className="field">
        <label htmlFor="mensaje">Mensaje</label>
        <textarea id="mensaje" name="mensaje" rows={5} minLength={5} required {...err("mensaje")} />
        {errores.mensaje ? <p id="mensaje-error" className="field-error">{errores.mensaje}</p> : null}
      </div>
      <button type="submit" className="btn btn--primary" disabled={estado === "enviando"}>
        {estado === "enviando" ? "Enviando…" : "Enviar solicitud"}
      </button>
      <p className="form__status" role="status" aria-live="polite">
        {estado === "enviado" ? "Recibimos tu solicitud. Te contactamos pronto por teléfono o correo." : null}
        {estado === "error" ? `No pudimos enviar el formulario. Inténtalo de nuevo o escríbenos a ${sitio.correo}.` : null}
      </p>
    </form>
  );
}
