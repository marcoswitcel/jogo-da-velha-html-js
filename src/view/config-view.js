import { getById } from '../utils.js';
import { MenuView } from './menu-view.js';
import { View } from './view.js';

export class ConfigView extends View {

  /**
   * @type {HTMLSelectElement}
   */
  themeSelectElement;

  constructor(ctx) {
    super('app-view-config', getById('app-view-config'), ctx, 'Configurações');
    // @ts-expect-error
    this.themeSelectElement = this.query('#theme-mode')[0];
  }

  setup() {
    // setando a opção carregada
    this.themeSelectElement.value = this.ctx.config.theme;

    this.themeSelectElement.addEventListener('change', e => {
      /**
       * @type {HTMLSelectElement}
       */ //@ts-ignore
      const target = e.target; 
      const theme = target.value;
      
      if (theme === 'Dark' || theme === 'Light' || theme === 'Inherit') {
        this.ctx.config.theme = theme;
        this.ctx.saveConfig();
        this.ctx.applyTheme();
      }
    });

    this.query('#btn-action-menu')[0].addEventListener('click', e => {
      this.ctx.queueToChange(new MenuView(this.ctx));
    });
  }
}
