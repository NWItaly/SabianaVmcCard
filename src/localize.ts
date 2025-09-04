import en from "./translations/en.json";
import it from "./translations/it.json";

const translations: Record<string, any> = {
  en,
  it,
};

// Funzione helper: prende "ui.card.sabiana_vmc.errors.missing_entity"
// e scava dentro l'oggetto JSON
function getNestedTranslation(obj: any, path: string): string | undefined {
  return path.split(".").reduce((acc, part) => acc?.[part], obj);
}

export function localize(
  lang: string,
  key: string,
  params?: Record<string, string>
): string {
  // Recupera stringa nella lingua richiesta
  let str =
    getNestedTranslation(translations[lang], key) ??
    getNestedTranslation(translations["en"], key) ??
    key;

  // Sostituzione parametri dinamici {param}
  if (params) {
    Object.keys(params).forEach((param) => {
      str = str.replace(`{${param}}`, params[param]);
    });
  }

  return str;
}
