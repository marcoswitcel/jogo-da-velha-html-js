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

  constructor(name, template, ctx, description = null) {
    this.viewName = name;
    this.template = template;
    this.rootElement = template.content.cloneNode(true);
    this.ctx = ctx;
    this.description = description;
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

  /**
   * @return {void}
   */
  onBackPressed() {}
}
