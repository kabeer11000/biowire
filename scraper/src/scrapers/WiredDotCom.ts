import axios from "axios"
// import {readFile} from "fs/promises";
// import * as path from "path";
import cheerio from "cheerio";
import {Request, Response} from 'express';

export default async (req: Request, res: Response) => {
    try {

        // const html = await readFile(path.join(__dirname, "../../datasets/view-source_https___www.wired.com.html"));
        const html = await axios.get("https://www.wired.com/most-popular/").then(a => a.data);
        const $ = cheerio.load(html.toString());
        const articles = new Set();
        $("ul.archive-list-component__items > li.archive-item-component").each((index, el) => {
            const element = $(el).find("div.archive-item-component__info");
            const link = $(el).find("a.archive-item-component__link");
            const posters = link.find("a > div > div > div > div > img").attr("srcset")?.split(", ")?.map(a => ({[a.split(" ")[1]]: a.split(" ")[0]}))?.reduce((prev, value) => ({...prev, ...value}));
            articles.add({
                slug: link.attr("href"),
                id: Buffer.from(link.attr("href")?.split("#intcid=")[0].toString() || "").toString("base64"),
                snippet: {
                    title: link.find("h2.archive-item-component__title").text(),
                    description: link.find("p.archive-item-component__desc").text(),
                    published_at: element.find("time").text()
                },
                website: "wired.com",
                verified_source: true,
                author: {
                    name: element.find("span.byline-component__content > a").text(),
                    slug: `https://wired.com${element.find("span.byline-component__content > a").attr("href")}`
                },
                posters
            });
        });
        // let a = ""
        // $("ul.archive-list-component__items > li.archive-item-component").each((index, el) => {
        // a += $(el).html()
        // })
        // return res.send(a);
        res.json({
            title: $("#app-root > div > div.main--most-popular > div > div > span").html(),
            items: [...articles]
        });

    } catch (e) {
        console.log(e);
    }
}
