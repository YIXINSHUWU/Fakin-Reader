export default class bookClass {
  constructor({id, title, cover, cate, author, shortIntro, retentionRatio, latelyFollower, desc, bookCount, collectorCount}) {
    this.id = id;
    this.title = title;
    this.cover = cover;
    this.cate = cate;
    this.author = author;
    this.shortIntro = shortIntro;
    this.retentionRatio = retentionRatio;
    this.latelyFollower = latelyFollower;
    this.desc = desc;
    this.bookCount = bookCount;
    this.collectorCount = collectorCount
  }
};
