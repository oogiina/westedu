import Link from "next/link";
import { dateOf, imageOf, type News } from "@/lib/api";
export default function Card({
  item,
  featured = false,
}: {
  item: News;
  featured?: boolean;
}) {
  const image = item.blocks?.map(imageOf).find(Boolean);
  return (
    <article className={featured ? "card featured" : "card"}>
      {image && <img src={image} alt="" />}
      <div>
        <small>
          {item.category_id?.name ?? "Мэдээ"} · {dateOf(item.created_at)}
        </small>
        <h2>
          <Link href={`/news/${item._id}`}>{item.title}</Link>
        </h2>
        {!featured && (
          <Link className="more" href={`/news/${item._id}`}>
            Дэлгэрэнгүй →
          </Link>
        )}
      </div>
    </article>
  );
}
