import { getById } from '../utils.js';
import { version } from '../version.js';
import { MenuView } from './menu-view.js';
import { View } from './view.js';

export class ConfigView extends View {

  /**
   * @type {HTMLSelectElement}
   */
  themeSelectElement;
  /**
   * @type {HTMLSelectElement}
   */
  langSelectElement;

  constructor(ctx) {
    super('app-view-config', getById('app-view-config'), ctx, 'Configurações');
    // @ts-expect-error
    this.themeSelectElement = this.query('#theme-mode')[0];
    // @ts-expect-error
    this.langSelectElement = this.query('#lang-select')[0];
    this.query('#version')[0].innerText = version;
  }

  setup() {
    // setando a opção carregada
    this.themeSelectElement.value = this.ctx.config.theme;
    this.langSelectElement.value = this.ctx.config.lang;

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

    this.langSelectElement.addEventListener('change', e => {
      /**
       * @type {HTMLSelectElement}
       */ //@ts-ignore
      const target = e.target; 
      const lang = target.value;
      
      if (lang === 'pt-BR' || lang === 'en-USA') {
        // @note João, tá duplicado essa informação, tirar das config? ou achar um jeito de vincular?
        this.ctx.config.lang = lang;
        this.ctx.i18n.lang = lang;
        this.ctx.saveConfig();
        // @note João, pra recarregar a própria tela de config foi feito esse 'hack' aonde é solicitado 
        // para trocar para essa mesma tela
        this.ctx.queueToChange( new ConfigView(this.ctx))
        this.ctx.applyTheme();
      }
    });

    document.addEventListener('keyup', this.handleKeyUp);

    this.query('#btn-action-menu')[0].addEventListener('click', e => {
      this.ctx.queueToChange(new MenuView(this.ctx));
    });
  }

  /**
   * 
   * @param {KeyboardEvent} e 
   */
  handleKeyUp = (e) => {
    if (e.code === 'Escape') {
      this.ctx.queueToChange(new MenuView(this.ctx));
    }
  }

  onBackPressed() {
    this.ctx.queueToChange(new MenuView(this.ctx));
    return true;
  }

  cleanup() {
    document.removeEventListener('keyup', this.handleKeyUp);
  }
}
