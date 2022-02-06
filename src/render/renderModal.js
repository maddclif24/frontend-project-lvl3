const renderModal = ({ title, description, link }) => {
  const modalTitle = document.getElementById('exampleModalLabel');
  modalTitle.textContent = title;

  const modalBody = document.querySelector('.modal-body');
  modalBody.textContent = description;

  const modalLink = document.querySelector('.full-article');
  modalLink.href = link;
};
export default renderModal;
