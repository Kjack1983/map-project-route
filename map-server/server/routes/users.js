import express from 'express';
let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(200).json({message: 'No users at the moment!'});
});

export default router;
