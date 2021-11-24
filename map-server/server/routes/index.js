import express from 'express';
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    message: 'Simple calculator Application'
  });
});

export default router;
