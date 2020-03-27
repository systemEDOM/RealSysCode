import User from '../schema/user.schema';
import mongoose from 'mongoose';

const UserController = {
    getAll: function (req, res) {
        const user = new User({
            _id: mongoose.Types.ObjectId(),
            name: "Daniel",
            username: "system",
            email: "codigito.c@gmail.com",
            password: "system",
        });

        user.save().then( result => res.send("saved") ).catch( error => res.send("error") );
    },
};

module.exports = UserController;