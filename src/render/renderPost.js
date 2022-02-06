const renderPost = (posts) => {
  const postDiv = document.querySelector('.posts');
  const ul = document.createElement('ul');
  ul.className = ('class', 'list-group border-0 rounded-0');

  const list = posts.map(({
    title, link, id,
  }) => `<li class="list-group-item d-flex justify-content-between align-items-start border-0 border-end-0"><a href=${link} class="fw-bold" id=${id} target="_blank">${title}</a><button id="${id}" type="button" class="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">Просмотр</button></li>`).join(' ');
  ul.innerHTML = list;
  const h4Post = '<div class="card-body"><h2 class="card-title h4">Посты</h2></div>';

  postDiv.innerHTML = h4Post;
  postDiv.append(ul);
  return postDiv;
};
export default renderPost;
