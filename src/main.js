import { AppContext } from './app-context.js';
import { getById } from './utils.js';
import { MenuView } from './view/menu-view.js';

console.log('Olá mundo do "Jogo da Velha" em HTML');

const defaultPageTitle = 'Jogo da Velha';
const context = new AppContext(getById('app'), getById('app-modal'));

context.loadConfig();


context.queueToChange(new MenuView(context));

requestAnimationFrame(function managmentLoop() {

  if (context.queuedForEntering.length) {
    const view = context.queuedForEntering.shift();
    if (context.currentView) {
      context.currentView.cleanup();
    }
    context.currentView = view;
    view.setup();

    if (view.description) {
      document.title = view.description;
    } else {
      document.title = defaultPageTitle;
    }

    history.replaceState({ view: view.viewName }, '');
    context.attachElementsToContainer(view);
  }

  if (context.queuedForEnteringModal.length) {
    const view = context.queuedForEnteringModal.shift();
    if (context.currentModalView) {
      context.currentModalView.cleanup();
    }
    context.currentModalView = view;
    view.setup();

    // @note João, adicionar a history state?
    context.attachElementsToModal(view);
  }

  requestAnimationFrame(managmentLoop);
});

// history state temporário
history.pushState({ view: '[]' }, '');

window.addEventListener('popstate', (event) => {
  const view = context.currentView;

  /**
   * @note João, aqui tem um questão interessante, poderia vincular o 'back press' a uma ação automática
   * de voltar para view anterior e permitir customizar isso via o método abaixo, porém, por hora parece melhor
   * não fazer nada no 'back press' e deixar cada view implementar sua ação se quiser. Me parece que na maioria dos casos
   * não vamos fazer nada no 'back press'.
  */
  if (view.onBackPressed()) {
    history.pushState({ view: view.viewName }, '');
  }
});
