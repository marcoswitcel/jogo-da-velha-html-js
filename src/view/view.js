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

  constructor(name, template, ctx) {
    this.viewName = name;
    this.template = template;
    this.rootElement = template.content.cloneNode(true);
    this.ctx = ctx;
  }

  setup() {}
  cleanup() {}

  /**
   * 
   * @param {string} selector 
   * @returns {HTMLElement[]}
   */
  query(selector) {
    return Array.from(this.rootElement.querySelectorAll(selector));
  }
}
