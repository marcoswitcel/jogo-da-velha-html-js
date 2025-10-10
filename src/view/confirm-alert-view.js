import { delayHandler, getById } from '../utils.js';
import { View } from './view.js';

export class ConfirmAlertView extends View {
  /**
   * @type {string}
   */
  title;
  /**
   * @type {string}
   */
  descritption;
  /**
   * @type {() => void}
   */
  confirmHandle;
  /**
   * @type {() => void}
   */
  declineHandle;

  constructor(ctx, title, descritption, confirmHandle, declineHandle) {
    super('app-modal-confirm-alert', getById('app-modal-confirm-alert'), ctx);
    this.title = title;
    this.descritption = descritption;
    this.confirmHandle = confirmHandle;
    this.declineHandle = declineHandle;
  }

  setup() {
    this.rootElement.querySelector('.title').innerHTML = this.title;
    this.rootElement.querySelector('.description').innerHTML = this.descritption;
    this.rootElement.querySelector('#modal-btn-confirm').addEventListener('click', () => {
      // @todo João, avaliar uma forma mais organizada de configurar as transições
      delayHandler(() => {
        this.ctx.hiddeModal();
        if (this.confirmHandle) this.confirmHandle();
      }, 50);
    })
    this.rootElement.querySelector('#modal-btn-decline').addEventListener('click', () => {
      // @todo João, avaliar uma forma mais organizada de configurar as transições
      delayHandler(() => {
        this.ctx.hiddeModal();
        if (this.declineHandle) this.declineHandle();
      }, 50);
    })
  }
}
