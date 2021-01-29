interface atributes {
  name: string,
  max?: number,
  min?: number,
  ref?: string,
}

export default function validatorFields({
  name,
  max,
  min,
  ref,
}: atributes) {
  return {
    "array.max": `${name} deve conter pelo máximo ${max} itens`,
    "array.min": `${name} deve conter pelo mínimo ${min} itens`,
    "array.length": `${name} deve conter ${max} itens`,
    "string.empty": `${name} não pode ser vazio`,
    "string.guid" : `${name} deve ser um UUID valido`,
    "string.alphanum": `${name} deve somente conter caracteres alfanuméricos`,
    "string.max": `${name} deve ser menor ou igual a ${max} caracteres`,
    "string.min": `${name} deve ser maior ou igual a ${min} caracteres`,
    "string.length": `${name} deve ser de ${max} caracteres`,
    "string.email": `${name} deve ser um e-mail valido`,
    "string.pattern.base": `${name} deve ser numérico e ter ${max} dígitos`,
    "number.base": `${name} deve ser numérico`,
    "number.integer": `${name} deve ser um número inteiro`,
    "number.max": `${name} deve ser menor ou igual a ${max}`,
    "number.min": `${name} deve ser maior ou igual a ${min}`,
    "number.positive": `${name} deve ser um número positivo`,
    "date.format": `${name} deve ser no formato YYYY-MM-DD`,
    "boolean.base": `${name} deve ser um booleano`,
    "any.required": `${name} é obrigatório`,
    "any.only"    : `${name} deve ser igual a ${ref}`,
  };
}