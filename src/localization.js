
/**
 * Regex resposável por identificar partes.
 * A sequência de abertura é "{i18n:" e a finalização é "}"
 * O grupo de captura expresso por "([^}]+)" serve para extrair a parte entre o início e o fim.
 * Com esse grupo de captura ao invés de "(.*)" a regex para na primeira instância do caractere de finalização
 */
const pattern = /\{i18n:([^}]+)\}/g;

const localization = {
  page: {
    config: {
      title: { 'pt-BR': 'Configurações', 'en-USA': 'Configurations' },
    }
  }
};

/**
 * 
 * @param {any} obj 
 * @param {string} accessPattern 
 * @returns {[boolean, any]}
 */
const dotAccessor = (obj, accessPattern) => {
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

export class Localization {
  lang = 'pt-BR';
  templateElement;

  constructor() {
    this.templateElement = document.createElement('template');
    this.templateElement.id = 'localization-template';
  }

  /**
   * 
   * @param {HTMLTemplateElement} template 
   * @returns {HTMLElement}
   */
  makeRootElementFromTemplate(template) {
    let html = template.innerHTML;
    
    html = html.replaceAll(pattern, (fullMatch, groupMatch) => {
      const name = groupMatch + '.' + this.lang;
      const [ ok, value ] = dotAccessor(localization, name);

      console.assert(ok, `propriedade: '${name}'`)
      
      return ok ? value : '';
    });

    this.templateElement.innerHTML = html;
    
    // @ts-expect-error
    return this.templateElement.content.cloneNode(true);
  }
}
