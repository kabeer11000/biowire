import axios from "axios"
import cheerio from "cheerio";

export default async () => {
  try {
    const html = await axios.get("https://www.wired.com/most-popular/").then(a => a.data);
    const $ = cheerio.load(html.toString());
    const articles = new Set();
    $("ul.archive-list-component__items > li.archive-item-component").each((index, el) => {
      const element = $(el).find("div.archive-item-component__info");
      const link = $(el).find("a.archive-item-component__link");
      const posters = link.find("a > div > div > div > div > img").attr("srcset")?.split(", ")?.map(a => ({[a.split(" ")[1]]: a.split(" ")[0]}))?.reduce((prev, value) => ({...prev, ...value}));
      const authors = new Set();
      element.find("span.byline-component__content > a").each((index, el) => authors.add({
        name: $(el).text(),
        slug: Buffer.from(`https://wired.com${$(el).attr("href")}`).toString("base64"),
        avatars: {
          low: "https://cdn.jsdelivr.net/gh/kabeer11000/docs-hosted@biowire/AA.jpg",
          medium: "https://cdn.jsdelivr.net/gh/kabeer11000/docs-hosted@biowire/AA.jpg",
          high: "https://cdn.jsdelivr.net/gh/kabeer11000/docs-hosted@biowire/AA.jpg"
        }, // Optional
        verified: true, // Required
        external: {}, // Optional
      }))
      articles.add({
        id: Buffer.from(link.attr("href")?.split("#intcid=")[0].toString() || "").toString("base64"), // Required Base64
        snippet: {
          title: link.find("h2.archive-item-component__title").text(),
          description: link.find("p.archive-item-component__desc").text(),
          published_at: element.find("time").text(),
          excerpt: link.find("p.archive-item-component__desc").text(), // Optional
          posters: {
            low: posters?.["342w"],
            medium: posters?.["684w"],
            high: posters?.["1000w"],
          } // Optional
        },
        source: "wired.com", // Optional
        publishing: {
          published: element.find("time").text(),
          modified: element.find("time").text()
        }, // Optional
        verified: true, // Optional
        authors: [...authors] // Optional
      });
        });
    return [...articles];
    } catch (e) {
        console.log(e);
    }
}
