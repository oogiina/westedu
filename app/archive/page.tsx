import Header from "@/components/Header";
import Card from "@/components/Card";
import { archive, byDate, categories } from "@/lib/api";
export default async function ArchivePage({
  searchParams,
}: {
  searchParams: Promise<{ year?: string; month?: string; page?: string }>;
}) {
  const query = await searchParams;
  const months = (await archive()).content ?? [];
  const selected =
    query.year && query.month
      ? await byDate(query.year, query.month, Number(query.page) || 1)
      : null;
  const cats = await categories();
  return (
    <>
      <Header items={cats} />
      <main className="shell latest">
        <p className="eyebrow">МЭДЭЭНИЙ АРХИВ</p>
        <h1 className="page-title">Он, сараар хайх</h1>
        <div className="months">
          {months.map((m) => (
            <a
              className={
                query.year === m.on && query.month === m.sar ? "active" : ""
              }
              key={`${m.on}-${m.sar}`}
              href={`/archive?year=${m.on}&month=${m.sar}`}
            >
              {m.on} · {m.sar}-р сар
            </a>
          ))}
        </div>
        {selected && (
          <div className="cards-grid">
            {(selected.news ?? []).map((item) => (
              <Card key={item._id} item={item} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
