import {IArticle} from '@entities/Article';
import MockDaoMock from '../MockDb/MockDao.mock';


class ArticleDao extends MockDaoMock {

  public async insert(article: IArticle): Promise<void> {
    const db = await super.openDb();
    db.articles.push(article);
    await super.saveDb(db);
  }

  public async insertMany(articles: Array<IArticle>): Promise<void> {
    const db = await super.openDb();
    db.articles.concat(articles);
    await super.saveDb(db);
  }

}

export default ArticleDao;
