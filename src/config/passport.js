import LocalStrategy from 'passport-local';
import passport from 'passport';
import { Strategy } from 'passport-local';
import User from '../schema/user.schema';
import UserRepository from '../repositories/UserRepository';

passport.use(new Strategy({
    usernameField: 'email',
    passwordField: 'password',
}, async (email, password, done) => {
    await UserRepository.findOne(email).then( async user => {
        if (!user) {
            return done(null, false, { message: 'Not user found' })
        } else {
            const match = await user.matchPassword(password);
            if (match) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Incorrect credentials' })
            }
        }
    });
}));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    await UserRepository.findById(id).then( (user, err) => {
        done(err, user); 
    });
});