import { AppContext } from '../app-context.js';

export class View {
  /**
   * @type {HTMLTemplateElement}
   */
  template;
  /**
   * @type {HTMLElement}
   */
  rootElement;

  /**
   * @type {AppContext}
   */
  ctx;

  /**
   * @type {string|null}
   */
  description;

  /**
   * 
   * @param {string} name 
   * @param {HTMLTemplateElement} template 
   * @param {AppContext} ctx 
   * @param {string|null} description 
   */
  constructor(name, template, ctx, description = null) {
    this.viewName = name;
    this.template = template;
    // @todo João, considerar como cachear essa operação, por hora é feito do jeito lento mesmo
    // this.rootElement = template.content.cloneNode(true);
    this.rootElement = ctx.i18n.makeRootElementFromTemplate(template);
    this.ctx = ctx;
    this.description = description;
  }

  /**
   * @returns {void}
   */
  setup() {}
  /**
   * @returns {void}
   */
  cleanup() {}

  /**
   * 
   * @param {string} selector 
   * @returns {HTMLElement[]}
   */
  query(selector) {
    return Array.from(this.rootElement.querySelectorAll(selector));
  }

  /**
   * @return {boolean} retorna true para previnir o pop do state e o fechamento da página caso seja o último state
   */
  onBackPressed() {
    return true;
  }
}
