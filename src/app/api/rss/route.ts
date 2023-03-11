import * as cheerio from "cheerio";

export async function GET(request: Request) {
  const url = "https://www.stuff.co.nz/feed/";
  let articleData: {
    title: string;
    description: string;
  }[] = [];

  await fetch(url)
    .then((response) => response.text())
    .then((data) => {
      const $ = cheerio.load(data, {
        xml: true,
      });
      const newsArticles = $("item");

      const titles = newsArticles
        .find("title")
        .map((i, el) => {
          const textNode = el.firstChild;
          if (textNode === null) return;

          // @ts-ignore
          return textNode.data;
        })
        .toArray();

      const descriptions = newsArticles
        .find("description")
        .map((i, el) => {
          const textNode = el.firstChild;
          if (textNode === null) return;

          // @ts-ignore
          return textNode.data;
        })
        .toArray();

      9;
      articleData = titles.map((title, i) => {
        return {
          title: title,
          description: descriptions[i],
        };
      });
    });

  console.log(articleData);

  return new Response(JSON.stringify(articleData));
}
