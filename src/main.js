
console.log("Olá mundo do 'Jogo da Velha' em HTML");

const getById = (id) => document.getElementById(id);

class View {
  /**
   * @type {HTMLTemplateElement}
   */
  template;
  /**
   * @type {HTMLElement}
   */
  rootElement;

  constructor(name, template) {
    this.viewName = name;
    this.template = template;
    this.rootElement = template.conten.cloneNode(true);
  }

  setup() {}
}

const appRoot = getById('app');
const views = [ getById('app-view-menu'), getById('app-view-in-game'), ];

const changeToView = viewName => {
  appRoot.innerHTML = ''; // @todo Otimizar isso aqui
  appRoot.appendChild(getById(viewName).content.cloneNode(true));
}

changeToView('app-view-menu');

getById('btn-action-play').addEventListener('click', () => {
  changeToView('app-view-in-game');
});
