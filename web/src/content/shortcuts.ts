import type { L } from "@/i18n/config";

export type Shortcut = { abbr: string; output: string; text: L };

/** Emmet abbreviations, from the simplest tag to whole page skeletons. */
export const shortcuts: Shortcut[] = [
  { abbr: "h1", output: "<h1></h1>", text: { ar: "اسم الوسم وحده يكتب الوسم كاملًا", en: "A tag name alone writes the whole tag" } },
  { abbr: "!", output: "<!DOCTYPE html>\n<html lang=\"en\">…</html>", text: { ar: "هيكل صفحة HTML كاملة", en: "A complete HTML page skeleton" } },
  { abbr: "ul>li*3", output: "<ul>\n  <li></li>\n  <li></li>\n  <li></li>\n</ul>", text: { ar: "> بداخل، و * للتكرار", en: "> nests, * repeats" } },
  { abbr: "div.card", output: '<div class="card"></div>', text: { ar: "النقطة تضيف class", en: "A dot adds a class" } },
  { abbr: "section#about", output: '<section id="about"></section>', text: { ar: "علامة # تضيف id", en: "A # adds an id" } },
  { abbr: "h2+p", output: "<h2></h2>\n<p></p>", text: { ar: "+ يضع العنصرين بجانب بعض", en: "+ places elements side by side" } },
  { abbr: "a:link", output: '<a href="http://"></a>', text: { ar: "رابط جاهز بخاصية href", en: "A ready link with href" } },
  { abbr: "p{Hello}", output: "<p>Hello</p>", text: { ar: "الأقواس { } تضع نصًا داخل الوسم", en: "Braces { } put text inside the tag" } },
  { abbr: "li.item$*3", output: '<li class="item1"></li>\n<li class="item2"></li>\n<li class="item3"></li>', text: { ar: "$ يرقّم العناصر تلقائيًا", en: "$ numbers the items for you" } },
  { abbr: "header>nav^main", output: "<header>\n  <nav></nav>\n</header>\n<main></main>", text: { ar: "^ يصعد مستوى واحدًا", en: "^ climbs up one level" } },
  { abbr: "img", output: '<img src="" alt="">', text: { ar: "صورة مع src و alt", en: "An image with src and alt" } },
  { abbr: "input:email", output: '<input type="email" name="" id="">', text: { ar: "حقل بريد إلكتروني", en: "An email input" } },
];
