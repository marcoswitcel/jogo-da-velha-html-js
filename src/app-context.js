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

  constructor(rootElement) {
    this.rootElement = rootElement;
  }

  /**
   * 
   * @param {View} view 
   */
  attachElementsToContainer(view) {
    this.rootElement.innerHTML = ''; // @todo Otimizar isso aqui
    this.rootElement.appendChild(view.rootElement);
  }

  queueToChange(view) {
    this.queuedForEntering.push(view);
  }
}
