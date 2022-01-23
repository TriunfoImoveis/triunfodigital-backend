
export default function formated_strings(text: string): string {
  const removed_special_characters = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const text_formated = removed_special_characters.toLocaleUpperCase();

  return text_formated;
}