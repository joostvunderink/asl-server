import * as fs from 'fs';
import * as path from 'path';
import logger from '../logger';

export function initEventHandlers() {
  const baseDir = path.join('.', 'src', 'events', 'handlers');
  const filenames = fs.readdirSync(baseDir);

  filenames.forEach(filename => {
    const m = require('./handlers/' + filename.replace(/.ts$/, ''));

    m.eventHandlers.forEach(eh => {
      process.on(eh.event, eh.handler);
      logger.info({ filename: filename, event: eh.event, description: eh.description }, 'Added event handler');
    });
  });
}