import { uniqueId } from 'lodash';

const generatedId = (data) => {
  const result = data.map((item) => {
    if (!Object.prototype.hasOwnProperty.call(item, 'id')) {
      // eslint-disable-next-line no-param-reassign
      item.id = uniqueId();
    }
    return item;
  });
  return result;
};
export default generatedId;
