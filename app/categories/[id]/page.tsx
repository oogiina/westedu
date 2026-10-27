import Header from "@/components/Header";
import Card from "@/components/Card";
import { categories, news } from "@/lib/api";
export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { id } = await params;
  const { page = "1" } = await searchParams;
  const [items, data] = await Promise.all([
    categories(),
    news(id, Number(page) || 1),
  ]);
  return (
    <>
      <Header items={items} />
      <main className="shell latest">
        <p className="eyebrow">АНГИЛАЛ</p>
        <h1 className="page-title">
          {items.find((x) => x._id === id)?.name ?? "Мэдээ"}
        </h1>
        <div className="cards-grid">
          {(data.news ?? []).map((item) => (
            <Card key={item._id} item={item} />
          ))}
        </div>
        {data.pagination?.nextPage && (
          <a
            className="button"
            href={`/categories/${id}?page=${data.pagination.nextPage}`}
          >
            Дараагийн хуудас →
          </a>
        )}
      </main>
    </>
  );
}
