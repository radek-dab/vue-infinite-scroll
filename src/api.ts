import { z } from 'zod';

const CHARACTER_URL = 'https://rickandmortyapi.com/api/character';

export const Page = <T extends z.ZodType>(item: T) =>
  z.object({
    info: z.object({
      count: z.number(),
      pages: z.number(),
      next: z.nullable(z.string()),
      prev: z.nullable(z.string()),
    }),
    results: z.array(item),
  });
export type Page<T> = z.infer<ReturnType<typeof Page<z.ZodType<T>>>>;

export const Character = z.object({
  id: z.number(),
  name: z.string(),
  status: z.string(),
  species: z.string(),
  type: z.string(),
  gender: z.string(),
  origin: z.object({
    name: z.string(),
    url: z.string(),
  }),
  location: z.object({
    name: z.string(),
    url: z.string(),
  }),
  image: z.string(),
  episode: z.array(z.string()),
  url: z.string(),
  created: z.coerce.date(),
});
export type Character = z.infer<typeof Character>;

export async function* fetchCharacters(): AsyncGenerator<Page<Character>> {
  let url: string | null = CHARACTER_URL;
  while (url) {
    const response = await fetch(url);
    const body = await response.json();
    const page = Page(Character).parse(body);
    yield page;
    url = page.info.next;
  }
}
