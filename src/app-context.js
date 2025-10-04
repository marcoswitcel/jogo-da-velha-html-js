import { View } from './view/view.js';

export class AppContext {
  /**
   * @type {View[]}
   */
  queuedForEntering = [];
  
  /**
   * @type {View|null}
   */
  currentView = null;

  /**
   * @type {'O'|'X'}
   */
  player = 'O';

  /**
   * @type {HTMLElement}
   */
  rootElement;

  /**
   * @type {HTMLElement}
   */
  rootModalElement;

  /**
   * 
   * @param {HTMLElement} rootElement 
   * @param {HTMLElement} rootModalElement 
   */
  constructor(rootElement, rootModalElement) {
    this.rootElement = rootElement;
    this.rootModalElement = rootModalElement;
  }

  /**
   * 
   * @param {View} view 
   */
  attachElementsToContainer(view) {
    this.rootElement.setAttribute('class', `app-container ${view.viewName}`);
    this.rootElement.innerHTML = ''; // @todo Otimizar isso aqui
    this.rootElement.appendChild(view.rootElement);
  }

  queueToChange(view) {
    this.queuedForEntering.push(view);
  }

  changePlayer() {
    this.player = (this.player === 'O') ? 'X' : 'O';
  }

  /**
   * 
   * @param {string} title 
   * @param {string} description 
   * @param {{ confirm: () => void, decline: () => void, }} param2 
   */
  confirm(title, description, { confirm, decline }) {
    // @todo João, refatorar isso aqui "implantar" o html padrão de novo toda vez pra evitar ficar com estado quebrado
    // @todo João, implementar callbacks e ajsutar layout

    this.rootModalElement.classList.remove('app-modal__hidden');
    this.rootModalElement.querySelector('.title').innerHTML = title;
    this.rootModalElement.querySelector('.description').innerHTML = description;
  }
}
