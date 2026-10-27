import Header from "@/components/Header";
import Card from "@/components/Card";
import { categories, news, season, stats, type Category } from "@/lib/api";
export default async function Home() {
  const [cats, stat, term] = await Promise.all([
    categories(),
    stats(),
    season(),
  ]);
  const main: Category | undefined =
    cats.find((c) => c.name === "Мэдээ") ?? cats[0];
  const data = main ? await news(main._id) : { news: [] };
  const list = data.news ?? [];
  const hero = list[0];
  return (
    <>
      <Header items={cats} />
      <main>
        <section className="hero shell">
          <div>
            <small>МУИС БАРУУН БҮСИЙН СУРГУУЛЬ</small>
            <h1>
              Мэдлэгийг түгээж,
              <br />
              <em>ирээдүйг бүтээнэ.</em>
            </h1>
            <p>
              Сургуулийн албан ёсны мэдээ, үйл явдал, мэдээллийг нэг дороос.
            </p>
            <a className="button" href={hero ? `/news/${hero._id}` : "#latest"}>
              Сүүлийн мэдээг унших →
            </a>
          </div>
          <div className="hero-art">
            <div className="hero-card">
              WEST EDU
              <strong>
                Мэдээ, мэдээлэл
                <br />
                хамтдаа.
              </strong>
            </div>
          </div>
        </section>
        <section className="shell latest" id="latest">
          <div className="heading">
            <div>
              <small>ОНЦЛОХ МЭДЭЭЛЭЛ</small>
              <h2>Сүүлийн мэдээ</h2>
            </div>
            {main && <a href={`/categories/${main._id}`}>Бүгдийг үзэх →</a>}
          </div>
          {hero ? (
            <div className="grid">
              <Card item={hero} featured />
              <div className="list">
                {list.slice(1, 5).map((x) => (
                  <Card key={x._id} item={x} />
                ))}
              </div>
            </div>
          ) : (
            <p>Одоогоор мэдээ байхгүй байна.</p>
          )}
        </section>
        <section className="stats">
          <div className="shell stat-grid">
            {Object.entries(stat).map(([k, v]) => (
              <div key={k}>
                <strong>{v}</strong>
                <span>
                  {k === "bagshAjilchid"
                    ? "Багш, ажилтан"
                    : k === "oyutan"
                      ? "Оюутан"
                      : k === "hutulbur"
                        ? "Хөтөлбөр"
                        : "Тэнхим"}
                </span>
              </div>
            ))}
            <div>
              <strong>{term.uliral ?? "—"}</strong>
              <span>{term.garig ?? "Улирал"}</span>
            </div>
          </div>
        </section>
      </main>
      <footer className="shell">
        © {new Date().getFullYear()} МУИС-ийн Баруун бүсийн сургууль
      </footer>
    </>
  );
}
