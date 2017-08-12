import logger from '../logger';

import { importCompetition } from '../import/competition';


export function addImportRoutes(app) {
  app.post('/import/competition', routeImportCompetition);
}

async function routeImportCompetition(req, res, next) {
  try {
    const result = await importCompetition(req.body);
    res.status(200).send({
      competition_id: result.competition.id,
    });
  }
  catch(e) {
    res.status(500).send({
      errorCode: 'UnknownError',
      errorMessage: e.message || e,
    });
  }
}
