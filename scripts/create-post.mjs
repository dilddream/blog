#!/usr/bin/env node
import fs from "fs/promises";
import path from "path";
import fg from "fast-glob";

async function main() {
  const [,, rawTitle, category] = process.argv;
  if (!rawTitle || !category) {
    console.error("Usage: create-post.mjs \"제목\" <category>");
    process.exit(1);
  }
  const CATS = ["music","movie","game",,"diary","book"];
  if (!CATS.includes(category)) {
    console.error("Unknown category. Choose one of:", CATS.join(", "));
    process.exit(1);
  }

  const blogRoot = path.resolve("content/blog");

  // 1) 글로벌 넘버링: 모든 카테고리 하위 글 수 집계
  const allPosts = await fg("content/blog/*/*/index.md");
  const nextNumber = allPosts.length + 1;

  // 2) 오늘 날짜 YYYY-MM-DD
  const today = new Date().toISOString().slice(0, 10);

  // 3) 새 번들 폴더 생성
  const newDir = path.join(blogRoot, category, String(nextNumber));
  await fs.mkdir(newDir, { recursive: true });

  // 4) 해당 카테고리 archetype 읽어서 플레이스홀더 치환
  let tpl = await fs.readFile(
    path.resolve("archetypes", category, "index.md"),
    "utf-8"
  );

  tpl = tpl
  // diary archetype의 {{ .Date }} 치환
  .replace(/{{\s*\.Date\s*}}/g, today)
  // 기존 플레이스홀더 치환
  .replace(/{{\s*\.number\s*}}/g, String(nextNumber))
  .replace(/{{\s*\.title\s*}}/g, rawTitle)
  // date: 줄도 실제 오늘 날짜로 바꿔 줌
  .replace(/^date:.*$/m, `date: "${today}"`);

  // 5) index.md 생성
  const outPath = path.join(newDir, "index.md");
  await fs.writeFile(outPath, tpl, "utf-8");
  console.log(`✔ Created post: content/blog/${category}/${nextNumber}/index.md`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
