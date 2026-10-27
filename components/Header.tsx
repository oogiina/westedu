"use client";
import Link from "next/link";
import { useState } from "react";
import type { Category } from "@/lib/api";
export default function Header({ items }: { items: Category[] }) {
  const [open, setOpen] = useState(false);
  return (
    <header>
      <div className="shell header">
        <Link className="brand" href="/">
          <img src="http://west.edu.mn/logo.png" alt="Баруун бүсийн сургууль" />
          <span>МУИС-ийн Баруун бүсийн сургууль</span>
        </Link>
        <nav>
          <Link href="/">Нүүр</Link>
          <button onClick={() => setOpen(!open)} aria-expanded={open}>
            Ангилал⌄
          </button>
          {open && (
            <div className="dropdown">
              {items.map((i) => (
                <Link
                  key={i._id}
                  href={`/categories/${i._id}`}
                  onClick={() => setOpen(false)}
                >
                  {i.name}
                </Link>
              ))}
            </div>
          )}
          <Link href="/archive">Архив</Link>
        </nav>
      </div>
    </header>
  );
}
