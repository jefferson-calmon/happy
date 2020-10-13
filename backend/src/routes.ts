import Router from 'express';
import multer from 'multer';

import OrphanagesController from './controllers/OrphanagesController';
import uploadConfig from './config/upload';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/orphanages', upload.array('images'), OrphanagesController.create);

export default routes;


// {
// 	"name": "Cata Vento",
// 	"latitude": -16.420947,
// 	"longitude": -39.084208,
// 	"about": "Sobre o orfanato",
// 	"instrucions": "Instruções de visita",
// 	"opening_hours": "Das 8h até as 18h",
// 	"open_on_weekends": true
// }