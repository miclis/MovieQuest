import { Router } from 'express';
const router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Machine Learning Data Gathering Project',
        description: `Please help us gather data for our machine learning and optimization project :)
        We only ask you to simply press a button that represents your personal opinion regarding the movie.
        If you haven't seen it - please click "NOT SEEN" button.`,
        descriptionPL: `Pomóż nam zebrać dane do projektu z dziedziny Machine Learning i optymalizacji :)
        Wystarczy, że naciśniesz przycisk odpowiadający Twojej ocenie danego filmu lub przycisk "NIE WIDZIAŁEM".`,
        id: 1 // Id of first movie
    });
});

export default router;