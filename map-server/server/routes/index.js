import express from 'express';
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    message: 'Mern stack applicatoin popeye routes'
  });
});

export default router;
