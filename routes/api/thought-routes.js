const router = require('express').Router();
const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

//    GET all and Create thought
router
    .route('/')
    .get(getAllThought)
    .post(createThought);

//    GET one and Update one thought
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought);

//    delete a thought
router
    .route('/:thoughtId/:userId')
    .delete(deleteThought);

//    Create and Delete a reaction to a thought
router
    .route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(removeReaction);


module.exports = router;