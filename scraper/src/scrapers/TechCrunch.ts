// ts-nocheck
// https://techcrunch.com/wp-json/tc/v1/magazine?page=0&_embed=true&cachePrevention=0
import {default as axios} from "axios";

interface ITechCrunchMedia {
  "id": number,
  "date": string,
  "link": string,
  "media_details": {
    [x: string]: any,
    "sizes": {
      [x: string]: {
        "file": string,
        "width": number,
        "height": number,
        "mime_type": string,
        "source_url": string
      },
      "thumbnail": {
        "file": string,
        "width": number,
        "height": number,
        "mime_type": string,
        "source_url": string
      },
      "medium": {
        "file": string,
        "width": number,
        "height": number,
        "mime_type": string,
        "source_url": string
      },
      "large": {
        "file": string,
        "width": number,
        "height": number,
        "mime_type": string,
        "source_url": string
      },
    },
  },

  [x: string]: any,
}

interface ITechCrunchAuthor {
  "id": number,
  "name": string,
  "url"?: string,
  "description"?: string,
  "link": string,
  "slug": string,
  "avatar_urls"?: {
    "24"?: string,
    "48"?: string,
    "96"?: string
  },
  "links"?: {
    [x: string]: string
  },

  [x: string]: any
}

interface ITechCrunchArticle {
  "id": number,
  "date": string,
  "modified": string,
  "slug": string,
  "link": string,
  "title": {
    "rendered"?: string,
    [x: string]: any,
  },
  "content": {
    "rendered"?: string,
    [x: string]: any,
  },
  "excerpt": {
    "rendered"?: string,
    [x: string]: any,
  },
  "_embedded": {
    [x: string]: any,
    "authors": ITechCrunchAuthor[]
    "wp:featuredmedia": ITechCrunchMedia[],
  }

  [x: string]: any,
}

export default async () => {
  const articles: ITechCrunchArticle[] = await axios.get("https://cdn.jsdelivr.net/gh/kabeer11000/docs-hosted@biowire/tech-crunch.json").then(a => a.data);
  const response = new Set();
  for (const article of articles) {
    response.add({
      id: Buffer.from(article.link).toString("base64"), // Required Base64
      snippet: {
        title: article.title.rendered, // Required
        description: article?.content.rendered, // Optional
        excerpt: article?.excerpt.rendered, // Optional
        posters: {
          low: article._embedded["wp:featuredmedia"].length ? article._embedded["wp:featuredmedia"]?.[0].media_details.sizes.thumbnail.source_url : undefined,
          medium: article._embedded["wp:featuredmedia"].length ? article._embedded["wp:featuredmedia"]?.[0].media_details.sizes.medium.source_url : undefined,
          high: article._embedded["wp:featuredmedia"].length ? article._embedded["wp:featuredmedia"]?.[0].media_details.sizes.large.source_url : undefined,
        } // Optional
      },
      source: "techcrunch.com", // Optional
      publishing: {
        published: article.date,
        modified: article.modified
      }, // Optional
      verified: true, // Optional
      authors: article._embedded?.authors.map(author => ({
        name: author.name, // Optional
        slug: Buffer.from(author.link).toString("base64"), // Optional
        avatars: {
          low: author.avatar_urls?.["24"],
          medium: author?.avatar_urls?.["48"],
          high: author?.avatar_urls?.["96"]
        }, // Optional
        verified: true, // Required
        external: author?.links, // Optional
      })) // Optional
    });
  }
  return [...response]
}
