import type { L } from "@/i18n/config";

/** `after`: the lesson that teaches what the shortcut writes; it unlocks once that lesson is done. */
export type Shortcut = { abbr: string; output: string; text: L; after: string };

/** Emmet abbreviations, from the simplest tag to whole page skeletons. */
export const shortcuts: Shortcut[] = [
  { after: "html/what-is-html", abbr: "h1", output: "<h1></h1>", text: { ar: "اسم الوسم وحده يكتب الوسم كاملًا", en: "A tag name alone writes the whole tag" } },
  { after: "html/page-skeleton", abbr: "!", output: "<!DOCTYPE html>\n<html lang=\"en\">…</html>", text: { ar: "هيكل صفحة HTML كاملة", en: "A complete HTML page skeleton" } },
  { after: "html/lists", abbr: "ul>li*3", output: "<ul>\n  <li></li>\n  <li></li>\n  <li></li>\n</ul>", text: { ar: "> بداخل، و * للتكرار", en: "> nests, * repeats" } },
  { after: "css/what-is-css", abbr: "div.card", output: '<div class="card"></div>', text: { ar: "النقطة تضيف class", en: "A dot adds a class" } },
  { after: "css/what-is-css", abbr: "section#about", output: '<section id="about"></section>', text: { ar: "علامة # تضيف id", en: "A # adds an id" } },
  { after: "html/first-page", abbr: "h2+p", output: "<h2></h2>\n<p></p>", text: { ar: "+ يضع العنصرين بجانب بعض", en: "+ places elements side by side" } },
  { after: "html/links-images", abbr: "a:link", output: '<a href="http://"></a>', text: { ar: "رابط جاهز بخاصية href", en: "A ready link with href" } },
  { after: "html/first-page", abbr: "p{Hello}", output: "<p>Hello</p>", text: { ar: "الأقواس { } تضع نصًا داخل الوسم", en: "Braces { } put text inside the tag" } },
  { after: "html/lists", abbr: "li.item$*3", output: '<li class="item1"></li>\n<li class="item2"></li>\n<li class="item3"></li>', text: { ar: "$ يرقّم العناصر تلقائيًا", en: "$ numbers the items for you" } },
  { after: "html/semantic-layout", abbr: "header>nav^main", output: "<header>\n  <nav></nav>\n</header>\n<main></main>", text: { ar: "^ يصعد مستوى واحدًا", en: "^ climbs up one level" } },
  { after: "html/links-images", abbr: "img", output: '<img src="" alt="">', text: { ar: "صورة مع src و alt", en: "An image with src and alt" } },
  { after: "html/forms", abbr: "input:email", output: '<input type="email" name="" id="">', text: { ar: "حقل بريد إلكتروني", en: "An email input" } },
  { after: "html/tables", abbr: "table>tr*2>td*3", output: "<table>\n  <tr><td></td><td></td><td></td></tr>\n  <tr><td></td><td></td><td></td></tr>\n</table>", text: { ar: "جدول من صفين وثلاثة أعمدة", en: "A table with 2 rows and 3 columns" } },
];
