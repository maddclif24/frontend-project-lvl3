const parserDom = (content) => {
  const result = {
    postsParse: [],
    feedParse: null,
  };
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'application/xml');

  const feedTitle = doc.querySelector('title').textContent;
  const feedDescription = doc.querySelector('description').textContent;

  const posts = Array.from(doc.querySelectorAll('item')).map((item) => {
    const linkFeed = item.querySelector('link').textContent;
    const titleFeed = item.querySelector('title').textContent;
    const descriptionFeed = item.querySelector('description').textContent;
    return {
      title: titleFeed,
      description: descriptionFeed,
      link: linkFeed,
    };
  });

  result.postsParse = [...posts];
  result.feedParse = { title: feedTitle, description: feedDescription };
  return result;
};
export default parserDom;
