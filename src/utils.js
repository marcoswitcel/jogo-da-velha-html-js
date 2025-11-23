
export const getById = (id) => document.getElementById(id);

export const delayHandler = (handler, delayInMilliseconds) => setTimeout(handler, delayInMilliseconds)

export const clearThemeColor = () => {
  const elements = Array.from(document.querySelectorAll('meta[name="theme-color"]'));
  for (const element of elements)  {
    element.remove();
  }
}

/**
 * 
 * @param {string} color 
 * @param {string|null} media 
 * @returns 
 */
export const appendThemColor = (color, media = null) => {
  const meta = document.createElement('meta');
  
  meta.name = 'theme-color';
  meta.content = color;

  if (media) {
    meta.media = media;
  }

  document.head.appendChild(meta);

  return meta;
}

/**
 * 
 * @param {any} obj 
 * @param {string} accessPattern 
 * @returns {[boolean, any]}
 */
export const dotAccessor = (obj, accessPattern) => {
  const keys = accessPattern.split('.');

  let validPath = true;
  let valueObj = obj;
  
  for (const key of keys) {
    if (valueObj) {
      valueObj = valueObj[key];
    } else {
      validPath = false;
      break;
    }
  }

  return [validPath, valueObj];
};


