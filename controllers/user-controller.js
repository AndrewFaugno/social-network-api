const { User, Thought } = require('../models');

const userController = {
    // get all users
    getAllUser(req, res) {
        User.find()
            .populate({
                path: 'thoughts friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts friends',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No User found with this id!' });
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // create user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(500).json(err));
    },

    // update user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with that id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(500).json(err))
    },

    // delete a user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No User found with that id!' });
                };
                // supposed to delete all associated comments but doesn't seem to work
                // Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // add a friend to user

    // remove a friend from user
};

module.exports = userController;