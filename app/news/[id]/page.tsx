import { notFound } from "next/navigation";
import Header from "@/components/Header";
import { categories, detail, dateOf, imageOf } from "@/lib/api";
export default async function NewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [{ news: item }, cats] = await Promise.all([detail(id), categories()]);
  if (!item) notFound();
  const share = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://west.edu.mn/news/${id}`)}`;
  return (
    <>
      <Header items={cats} />
      <main className="shell article">
        <p className="eyebrow">
          {item.category_id?.name ?? "МЭДЭЭ"} · {dateOf(item.created_at)}
        </p>
        <h1>{item.title}</h1>
        <a className="share" href={share} target="_blank" rel="noreferrer">
          Facebook-д хуваалцах ↗
        </a>
        <div className="article-body">
          {(item.blocks ?? []).map((block, index) =>
            block.type === "image" || block.type === "simpleImage" ? (
              imageOf(block) && <img key={index} src={imageOf(block)} alt="" />
            ) : block.type === "delimiter" ? (
              <hr key={index} />
            ) : (
              <p key={index}>
                {String(
                  (block.data as { text?: string } | undefined)?.text ?? "",
                ).replace(/<[^>]*>/g, "")}
              </p>
            ),
          )}
        </div>
      </main>
    </>
  );
}
