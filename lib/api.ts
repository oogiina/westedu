const BASE = process.env.API_BASE_URL ?? "http://west.edu.mn:3000/api/v1";
export type Category = { _id: string; name: string };
export type Block = { type?: string; data?: Record<string, unknown> };
export type News = {
  _id: string;
  title: string;
  created_at?: string;
  blocks?: Block[];
  category_id?: { name?: string };
};
export type Page = {
  total?: number;
  pageCount?: number;
  nextPage?: number;
  prevPage?: number;
};
async function get<T>(path: string, revalidate = 60): Promise<T> {
  const r = await fetch(`${BASE}${path}`, {
    next: { revalidate },
    headers: { Accept: "application/json" },
  });
  if (!r.ok) throw new Error(`API ${r.status}`);
  return r.json();
}
export const categories = async () =>
  (await get<{ newsCategories?: Category[] }>("/newscategories", 300))
    .newsCategories ?? [];
export const stats = () =>
  get<Record<string, string>>("/settings/toonmedee", 300);
export const season = () =>
  get<Record<string, string | number>>("/settings/ognoo", 60);
export const news = (id: string, page = 1, limit = 12) =>
  get<{ news?: News[]; pagination?: Page }>(
    `/news?category_id=${encodeURIComponent(id)}&page=${page}&limit=${limit}`,
  );
export const detail = (id: string) =>
  get<{ news?: News }>(`/news/${encodeURIComponent(id)}`);
export const archive = () =>
  get<{ content?: { on: string; sar: string }[] }>("/news/arhiv", 300);
export const byDate = (year: string, month: string, page = 1) =>
  get<{ news?: News[]; pagination?: Page }>(
    `/news/finddate?on=${year}&sar=${month}&page=${page}&limit=12`,
  );
export const imageOf = (block?: Block) => {
  const d = block?.data as
    { file?: { url?: string }; url?: string } | undefined;
  return d?.file?.url ?? d?.url;
};
export const dateOf = (date?: string) =>
  date
    ? new Intl.DateTimeFormat("mn-MN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(date))
    : "";
