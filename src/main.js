import { AppContext } from './app-context.js';
import { getById } from './utils.js';
import { MenuView } from './view/menu-view.js';

console.log('Olá mundo do "Jogo da Velha" em HTML');

const context = new AppContext(getById('app'));

context.queueToChange(new MenuView(context));

requestAnimationFrame(function managmentLoop() {

  if (context.queuedForEntering.length) {
    const view = context.queuedForEntering.shift();
    if (context.currentView) {
      context.currentView.cleanup();
    }
    context.currentView = view;
    view.setup();

    context.attachElementsToContainer(view);
  }

  requestAnimationFrame(managmentLoop);
});

