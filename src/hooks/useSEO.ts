import { useEffect } from "react";

const SITE_NAME = "Mipador";
const DEFAULT_DESCRIPTION =
  "Moroccan furniture and decor for spaces that breathe — handcrafted indoors & outdoors.";

export function useSEO(title: string, description: string = DEFAULT_DESCRIPTION) {
  useEffect(() => {
    document.title = title ? `${title} — ${SITE_NAME}` : SITE_NAME;

    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);
  }, [title, description]);
}

export function useJsonLd(schema: Record<string, unknown> | null) {
  useEffect(() => {
    if (!schema) return;
    const id = "mipador-json-ld";
    let el = document.getElementById(id) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.id = id;
      el.type = "application/ld+json";
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(schema);
    return () => {
      document.getElementById(id)?.remove();
    };
  }, [schema]);
}
