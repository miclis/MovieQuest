import { Router } from 'express';
const router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('end', {
        title: 'Machine Learning Data Gathering Project',
        description: `Thank you for your answers!`
    });
});

export default router;
