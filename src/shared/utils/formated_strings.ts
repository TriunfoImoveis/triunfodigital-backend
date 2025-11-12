interface IClientWithProfession {
  profession_id?: string;
  profession?: {
    name: string;
  };
  occupation?: string;
}

export default function formated_strings(text: string): string {
  const removed_special_characters = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const text_formated = removed_special_characters.toLocaleUpperCase();

  return text_formated;
}

export function getProfessionName(
  client: IClientWithProfession | null | undefined
): string | null {
  if (!client) {
    return null;
  }

  if (client.profession_id && client.profession?.name) {
    return client.profession.name;
  }

  if (client.occupation) {
    return client.occupation;
  }

  return null;
}
