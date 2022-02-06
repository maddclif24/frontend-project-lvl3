const renderReadRss = (posts) => {
  posts.forEach((post) => {
    const el = document.getElementById(post.id);
    el.classList.remove('fw-bold');
    el.classList.add('fw-normal', 'link-secondary');
  });
};
export default renderReadRss;
