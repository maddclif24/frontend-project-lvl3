const renderFeeds = (feeds) => {
  const divFeeds = document.querySelector('.feeds');
  const ul = document.createElement('ul');
  ul.className = ('class', 'list-group border-0 rounded-0');
  const list = feeds.map(({ title, description }) => `<li class="list-group-item border-0 border-end-0"><h3 class="h6 m-0">${title}</h3><p class="m-0 small text-black-50">${description}</p></li>`);

  const h4Post = '<div class="card-body"><h2 class="card-title h4">Фиды</h2></div>';
  ul.innerHTML = list.join(' ');
  divFeeds.innerHTML = h4Post;
  divFeeds.append(ul);

  return divFeeds;
};
export default renderFeeds;
