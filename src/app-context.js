import { ConfirmAlertView } from './view/confirm-alert-view.js';
import { View } from './view/view.js';

export class AppContext {
  /**
   * @type {View[]}
   */
  queuedForEntering = [];

  /**
   * @type {View[]}
   */
  queuedForEnteringModal = [];
  
  /**
   * @type {View|null}
   */
  currentView = null;

  /**
   * @type {View|null}
   */
  currentModalView = null;

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

  /**
   * 
   * @param {View} view 
   */
  attachElementsToModal(view) {
    this.rootModalElement.setAttribute('class', `app-modal ${view.viewName}`);
    this.rootModalElement.innerHTML = ''; // @todo Otimizar isso aqui
    this.rootModalElement.appendChild(view.rootElement);
  }

  hiddeModal() {
    this.rootModalElement.classList.add('app-modal__hidden');
  }

  /**
   * 
   * @param {View} view 
   * @param {'app_view'|'modal'} mode 
   */
  queueToChange(view, mode = 'app_view') {
    if (mode === 'modal') {
      this.queuedForEnteringModal.push(view);
    } else {
      this.queuedForEntering.push(view);
    }
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

    this.queueToChange(new ConfirmAlertView(this, title, description, confirm, decline), 'modal');
  }
}
