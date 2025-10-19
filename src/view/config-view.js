import { getById } from '../utils.js';
import { View } from './view.js';

export class ConfigView extends View {
  constructor(ctx) {
    super('app-view-config', getById('app-view-config'), ctx, 'Configurações');

  }

  setup() {
    this.query('#theme-mode')[0].addEventListener('change', e => {
      /**
       * @type {HTMLSelectElement}
       */ //@ts-ignore
      const target = e.target; 
      const value = target.value;
      
      if (value === 'Dark') {
        // força "modo escuro" com com a classe 'dark-mode-on'
        this.ctx.rootElement.classList.add('dark-mode-on')
        this.ctx.rootElement.classList.remove('system-preferences-theme');
      } else if (value === 'Inherit') {
        // força "herdar do sistema" com com a classe 'system-preferences-theme', esta classe depende de estar
        // ativado o "modo escuro" para aplicar o tema do "modo escuro"
        this.ctx.rootElement.classList.add('system-preferences-theme');
        this.ctx.rootElement.classList.remove('dark-mode-on')
      } else {
        // O padrão é o "modo claro"
        this.ctx.rootElement.classList.remove('dark-mode-on');
        this.ctx.rootElement.classList.remove('system-preferences-theme');
      }
    })
  }
}
