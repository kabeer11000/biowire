export interface IArticle {
  id: String, // Required Base64
  snippet: {
    title: String, // Required
    description: String, // Optional
    excerpt: String, // Optional
    posters: {
      low: String,
      medium: String,
      high: String,
    } // Optional
  },
  source: String, // Optional
  publishing: {
    published: String,
    modified: String
  }, // Optional
  verified: Boolean, // Optional
  categories: Array<String>, // Required
  tags: Array<String>, // Optional
  author: {
    name: String, // Optional
    slug: String, // Optional
    avatars: {
      low: String,
      medium: String,
      high: String
    }, // Optional
    verified: Boolean, // Required
    external: Object, // Optional
  } // Optional
}

//
// class Article implements IArticle {
//     constructor(article) {}
//
// }

// export default Article;
