import { getById } from '../utils.js';
import { View } from './view.js';

export class InGameView extends View {
  constructor(ctx) {
    super('app-view-in-game', getById('app-view-in-game'), ctx);
  }
}
