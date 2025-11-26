import { Localization } from './localization.js';
import { appendThemColor, clearThemeColor } from './utils.js';
import { ConfirmAlertView } from './view/confirm-alert-view.js';
import { View } from './view/view.js';

const DARK_COLOR = '#333';
const LIGHT_COLOR = 'white';

/**
 * @typedef {{ theme: 'Dark' | 'Light' | 'Inherit', lang: 'pt-BR' | 'en-USA' }} ThemeConfig
 */

/**
 * @type {ThemeConfig}
 */
const DEFAULT_CONFIG = { theme: 'Light', lang: 'pt-BR' };

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
   * @todo joão, analisar se devo mover para a classe `TicTacToe`
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
   * @type {ThemeConfig | null}
   */
  config = null;

  /**
   * @type {Localization}
   */
  localization;

  /**
   * 
   * @param {HTMLElement} rootElement 
   * @param {HTMLElement} rootModalElement 
   */
  constructor(rootElement, rootModalElement) {
    this.rootElement = rootElement;
    this.rootModalElement = rootModalElement;
    this.localization = new Localization();
  }

  /**
   * @todo joão, analisar se devo mover para a classe `TicTacToe`
   * @returns 
   */
  getOtherPlayer() {
    return this.player === 'X' ? 'O' : 'X';
  }

  loadConfig() {
    // seta para o default
    this.config = { ...DEFAULT_CONFIG };
    this.localization.lang = this.config.lang;

    try {
      const loadedConfig = JSON.parse(localStorage.getItem('app.config'));
      const theme = (loadedConfig === null) ? DEFAULT_CONFIG.theme :  loadedConfig.theme;
      const lang = (loadedConfig === null) ? DEFAULT_CONFIG.lang :  loadedConfig.lang;
  
      // @note João, pora hora sanitizando assim...
      if (theme && 'Dark,Light,Inherit'.indexOf(theme) != -1) {
        this.config.theme = theme;
      } else {
        console.warn(`Valor inválido para tema: ${theme}`);
      }

      if (lang && 'pt-BR,en-USA'.indexOf(lang) != -1) {
        this.config.lang = lang;
        this.localization.lang = lang;
      } else {
        console.warn(`Valor inválido para linguagem: ${lang}`);
      }
    } catch (ex) {
      console.error(`Valor inválido para tema: ${localStorage.getItem('app.config')}\nStack a seguir:\n`, ex);
    }
  }

  saveConfig() {
    if (this.config) {
      localStorage.setItem('app.config', JSON.stringify(this.config));
    }
  }

  applyTheme() {
    const theme = this.config.theme;

    clearThemeColor();

    if (theme === 'Dark') {
      // força "modo escuro" com com a classe 'dark-mode-on'
      this.rootElement.classList.add('dark-mode-on')
      this.rootElement.classList.remove('system-preferences-theme');
      // modal
      this.rootModalElement.classList.add('dark-mode-on')
      this.rootModalElement.classList.remove('system-preferences-theme');
      // theme color
      appendThemColor(DARK_COLOR);
    } else if (theme === 'Inherit') {
      // força "herdar do sistema" com com a classe 'system-preferences-theme', esta classe depende de estar
      // ativado o "modo escuro" para aplicar o tema do "modo escuro"
      this.rootElement.classList.add('system-preferences-theme');
      this.rootElement.classList.remove('dark-mode-on')
      // modal
      this.rootModalElement.classList.add('system-preferences-theme');
      this.rootModalElement.classList.remove('dark-mode-on')
      // theme color
      appendThemColor(LIGHT_COLOR, '(prefers-color-scheme: light)');
      appendThemColor(DARK_COLOR, '(prefers-color-scheme: dark)');
    } else if (theme === 'Light')  {
      // O padrão é o "modo claro"
      this.rootElement.classList.remove('dark-mode-on');
      this.rootElement.classList.remove('system-preferences-theme');
      // modal
      this.rootModalElement.classList.remove('dark-mode-on');
      this.rootModalElement.classList.remove('system-preferences-theme');
      // theme color
      appendThemColor(LIGHT_COLOR);
    }
  }

  /**
   * @todo joão, analisar se devo mover para a classe `TicTacToe`
   */
  resetPlayState() {
    this.player = 'O';
  }

  /**
   * 
   * @param {View} view 
   */
  attachElementsToContainer(view) {
    this.rootElement.setAttribute('class', `app-container ${view.viewName}`);
    this.rootElement.innerHTML = ''; // @todo Otimizar isso aqui
    this.rootElement.appendChild(view.rootElement);

    this.applyTheme();
  }

  /**
   * 
   * @param {View} view 
   */
  attachElementsToModal(view) {
    this.rootModalElement.setAttribute('class', `app-modal ${view.viewName}`);
    this.rootModalElement.innerHTML = ''; // @todo Otimizar isso aqui
    this.rootModalElement.appendChild(view.rootElement);

    this.applyTheme();
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

  /**
   * @todo joão, analisar se devo mover para a classe `TicTacToe`
   */
  changePlayer() {
    this.player = (this.player === 'O') ? 'X' : 'O';
  }

  /**
   * 
   * @param {string} title 
   * @param {string} description 
   * @param {{ confirm: () => void, decline: () => void, confirmDescription?: string, declineDescription?: string }} param2 
   */
  confirm(title, description, { confirm, decline, confirmDescription = 'Jogar Novamente', declineDescription = 'Voltar ao Menu' }) {
    this.queueToChange(new ConfirmAlertView(this, title, description, confirm, decline, confirmDescription, declineDescription ), 'modal');
  }

  isModalOpen() {
    return !this.rootModalElement.classList.contains('app-modal__hidden');
  }

  updateTitle() {
    const defaultPageTitle = 'Jogo da Velha';
    const view = this.currentView;
    
    if (view.description) {
      document.title = view.description;
    } else {
      document.title = defaultPageTitle;
    }
  }
}
