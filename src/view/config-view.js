import { getById } from '../utils.js';
import { View } from './view.js';

export class ConfigView extends View {
  constructor(ctx) {
    super('app-view-config', getById('app-view-config'), ctx, 'Configurações - Jogo da Velha');
  }
}
