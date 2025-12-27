import { delayHandler, getTemplateById } from '../utils.js';
import { View } from './view.js';

const DELAY_DISPATCH_CLOSE = 50;

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

  buttonConfirmDescription;
  buttonDeclineDescription;

  constructor(ctx, title, descritption, confirmHandle, declineHandle,
    confirmDescription =  ctx.i18n.getTextLocale('global.yes'),
    declineDescription =  ctx.i18n.getTextLocale('global.no'),
  ) {
    super('app-modal-confirm-alert', getTemplateById('app-modal-confirm-alert'), ctx);
    this.title = title;
    this.descritption = descritption;
    this.confirmHandle = confirmHandle;
    this.declineHandle = declineHandle;
    this.confirmDescription = confirmDescription;
    this.declineDescription = declineDescription;
  }

  setup() {
    this.rootElement.querySelector('.title').innerHTML = this.title;
    this.rootElement.querySelector('.description').innerHTML = this.descritption;
    this.rootElement.querySelector('#modal-btn-confirm').innerHTML = this.confirmDescription;
    this.rootElement.querySelector('#modal-btn-confirm').addEventListener('click', () => {
      // @todo João, avaliar uma forma mais organizada de configurar as transições
      delayHandler(() => {
        this.ctx.hiddeModal();
        if (this.confirmHandle) this.confirmHandle();
      }, DELAY_DISPATCH_CLOSE);
    })
    this.rootElement.querySelector('#modal-btn-decline').innerHTML = this.declineDescription;
    this.rootElement.querySelector('#modal-btn-decline').addEventListener('click', () => {
      // @todo João, avaliar uma forma mais organizada de configurar as transições
      delayHandler(() => {
        this.ctx.hiddeModal();
        if (this.declineHandle) this.declineHandle();
      }, DELAY_DISPATCH_CLOSE);
    })
  }
}
