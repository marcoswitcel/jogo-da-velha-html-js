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

  constructor(rootElement) {
    this.rootElement = rootElement;
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
}
