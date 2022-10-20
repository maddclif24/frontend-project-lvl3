import onChange from 'on-change';
import renderValid from './render/renderValid.js';
import renderFeeds from './render/renderFeeds.js';
import renderPost from './render/renderPost.js';
import request from './render/axiosTimeout.js';
import renderModal from './render/renderModal.js';
import renderReadRss from './render/renderReadRss.js';
import renderDisabledUI from './render/renderDisabledUI.js';

const watchState = (state, i18next) => onChange(state, (path, value) => {
  switch (path) {
    case 'form.inputUrl':
      break;
    case 'validateForm':
      renderValid(state, path, value, i18next);
      break;
    case 'form.error':
      renderValid(state, path, value);
      break;
    case 'form.posts':
      renderPost(value);
      break;
    case 'form.feeds':
      renderFeeds(value);
      break;
    case 'form.rssLinks':
      request(state, value);
      break;
    case 'form.currentPost':
      renderModal(value);
      break;
    case 'form.readRss':
      renderReadRss(value);
      break;
    case 'form.disabledUI':
      renderDisabledUI(value);
      break;
    default:
      throw Error('Bobo))');
  }
});

export default watchState;
