import axios from "axios";
import cheerio from "cheerio";

export default async () => {
  const html = await axios.get("https://www.theverge.com/archives").then(a => a.data);
  const $ = cheerio.load(html.toString(), {});
  const articles = new Set();
  $("body > div.l-root.l-reskin > div.l-wrapper.has-group-header > div > div.l-col__main > div > div > div").each((index, element) => {
    const container = $(element);
    const authors = new Set();
    container.find("div > span.c-byline-wrapper > span:nth-child(1) > a").each((index, el) => {
      const author = $(el);
      authors.add({
        name: author.text(), // Optional
        slug: Buffer.from(author.attr("href") || "").toString("base64"), // Optional
        avatars: undefined, // Optional
        verified: true, // Required
        external: undefined, // Optional
      })
    });
    const poster = cheerio.load(container.find("a > div > noscript").html() || "");
    articles.add({
      id: Buffer.from(container.find("a").attr("href") || "").toString("base64"), // Required Base64
      snippet: {
        title: container.find("div > h2 > a").text(), // Required
        description: "", // Optional
        excerpt: "", // Optional
        posters: {
          low: poster("img").attr("src"),
          medium: poster("img").attr("src"),
          high: poster("img").attr("src"),
        } // Optional
      },
      source: "theverge.com", // Optional
      publishing: {
        published: container.find("div > span.c-byline-wrapper > span:nth-child(2) > time").attr("datetime"),
        modified: container.find("div > span.c-byline-wrapper > span:nth-child(2) > time").attr("datetime")
      }, // Optional
      verified: true, // Optional
      authors: [...authors] // Optional
    })
  });
  return [...articles]
}
