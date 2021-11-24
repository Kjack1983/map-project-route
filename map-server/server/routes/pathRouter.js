import express from 'express';
import {
    getPaths,
    getPath,
    addPopeye,
    deletePopeye,
    updatePopeye
} from '../controllers/paths';

const pathRouter = express.Router();

pathRouter.route('/popeye')
    .get(getPaths)
    .post(addPopeye)

pathRouter.route('/popeye/:id')
    .get(getPath)
    .delete(deletePopeye)
    .put(updatePopeye);


export default pathRouter;