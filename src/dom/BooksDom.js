import Book from '../assets/js/books'
function normalizeBooks(list) {
  let ret = [];
  let arr = list
  arr.forEach((item) => {
    let book = new Book({
      id: item._id,
      title: item.title,
      cover: item.cover,
      cate: item.minorCate || '',
      author: item.author,
      shortIntro: item.shortIntro || '',
      retentionRatio: item.retentionRatio || '',
      latelyFollower: item.latelyFollower || '',
      desc: item.desc || '',
      bookCount: item.bookCount || '',
      collectorCount: item.collectorCount || ''
    });
    ret.push(book)
  });
  return ret
}
export default normalizeBooks
