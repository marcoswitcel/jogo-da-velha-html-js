
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
    this.templateElement.innerHTML = template.innerHTML;
    // @todo João, implementar o replace do {i18n:titutlo}

    // @ts-expect-error
    return this.templateElement.content.cloneNode(true);
  }
}
