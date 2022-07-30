const router = require('express').Router();
const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thought-controller');

//    /api/thoughts
router
    .route('/')
    .get(getAllThought)
    .post(createThought)

//    /api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)

router
    .route('/:thoughtId/:userId')
    .delete(deleteThought)

module.exports = router;