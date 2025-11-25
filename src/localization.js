import { dotAccessor } from './utils.js';

/**
 * Regex resposável por identificar partes.
 * A sequência de abertura é "{i18n:" e a finalização é "}"
 * O grupo de captura expresso por "([^}]+)" serve para extrair a parte entre o início e o fim.
 * Com esse grupo de captura ao invés de "(.*)" a regex para na primeira instância do caractere de finalização
 */
const pattern = /\{i18n:([^}]+)\}/g;

const localization = {
  global: {
    back_to_menu: { 'pt-BR': 'Voltar ao Menu', 'en-USA': 'Back to Menu' },
  },
  page: {
    menu: {
      title: { 'pt-BR': 'Jogo da Velha', 'en-USA': 'Tic Tac Toe' },
      player1: { 'pt-BR': 'Dois Jogadores', 'en-USA': 'Two player\'s' },
      player2: { 'pt-BR': 'Jogador vs. AI', 'en-USA': 'Player vs. AI' },
      configurations: { 'pt-BR': 'Configurações', 'en-USA': 'Configurations' },
    },
    in_game: {
      player: { 'pt-BR': 'Jogador', 'en-USA': 'Player' },
      deciding: { 'pt-BR': 'Decidindo...', 'en-USA': 'Deciding...' },
    },
    config: {
      title: { 'pt-BR': 'Configurações', 'en-USA': 'Configurations' },
      description: { 'pt-BR': 'Configurações gerais do aplicativo', 'en-USA': 'General applications settings' },
      version: { 'pt-BR': 'Versão', 'en-USA': 'Version' },
    },
  }
};

export class Localization {
  /**
   * @type {'pt-BR'|'en-USA'}
   */
  lang = 'pt-BR';
  /**
   * @type {HTMLTemplateElement}
   */
  templateElement;

  constructor() {
    this.templateElement = document.createElement('template');
    this.templateElement.id = 'localization-template';
  }

  /**
   * 
   * @note João, talvez para exercício poderia fazer uma versão que permite preprocessar a mensagem pra incluir um argumento
   * 
   * @param {string} propertyName 
   * @param {string} defaultValue 
   * @returns {string}
   */
  lookupProperty(propertyName, defaultValue = '') {
    const name = propertyName + '.' + this.lang;
    const [ ok, value ] = dotAccessor(localization, name);

    console.assert(ok, `propriedade: '${name}'`)
      
    // default é string vazia por hora
    return ok ? value : defaultValue;
  }

  /**
   * 
   * @param {HTMLTemplateElement} template 
   * @returns {HTMLElement}
   */
  makeRootElementFromTemplate(template) {
    let html = template.innerHTML;
    
    html = html.replaceAll(pattern, (fullMatch, groupMatch0) => {
      const propertyName = groupMatch0;

      return this.lookupProperty(propertyName);
    });

    this.templateElement.innerHTML = html;
    
    // @ts-expect-error nesse caso sei que é um HTMLElement
    return this.templateElement.content.cloneNode(true);
  }
}
