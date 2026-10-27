import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "МУИС-ийн Баруун бүсийн сургууль",
  description: "Сургуулийн мэдээ, мэдээлэл",
};
export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="mn">
      <body>{children}</body>
    </html>
  );
}
