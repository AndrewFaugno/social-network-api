const { User, Thought } = require('../models');

const userController = {
    // get all users
    getAllUser(req, res) {
        User.find()
            .populate({
                path: 'thoughts',
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
            path: 'thoughts',
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
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true }
            )
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No User found with that id!' });
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));

    },

    // remove a friend from user
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
            )
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No User found with that id!' });
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));

    },
};

module.exports = userController;