interface IProfession {
  id?: string;
  name?: string;
  normalized_name?: string;
}

interface IClientWithProfession {
  profession_id?: string | null;
  profession?: IProfession | null;
  occupation?: string | null;
}

export default function formated_strings(text: string): string {
  const removed_special_characters = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const text_formated = removed_special_characters.toLocaleUpperCase();

  return text_formated;
}

export function getProfessionName(
  client: IClientWithProfession | null | undefined,
): string | null {
  if (!client) {
    return null;
  }
  if (
    client.profession_id !== undefined &&
    client.profession_id !== null &&
    client.profession &&
    typeof client.profession.name === 'string' &&
    client.profession.name.trim() !== ''
  ) {
    return client.profession.name;
  }

  if (client.occupation && typeof client.occupation === 'string') {
    const occ = client.occupation.trim();
    if (occ !== '') {
      return occ;
    }
  }

  return null;
}
