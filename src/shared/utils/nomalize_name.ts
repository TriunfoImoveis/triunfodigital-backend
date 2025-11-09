export default function normalizeName(name: string): string {
  return name
    .normalize('NFD')                     // separa acentos
    .replace(/[\u0300-\u036f]/g, '')     // remove acentos
    .replace(/\s+/g, ' ')                // normaliza espaços
    .replace(/[^\w\s-]/g, '')            // opcional: remove pontuação
    .trim()
    .toLowerCase();
}
