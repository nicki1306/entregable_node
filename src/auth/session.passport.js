import passport from 'passport';
import local from 'passport-local';
import UsersManager from '../dao/models/users.model.js';
import { isValidPassword } from '../utils.js';
import jwt from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import GitHubStrategy from 'passport-github2';
import config from '../config.js';


const localStrategy = LocalStrategy;
const manager = new UsersManager();
const jwtStrategy = jwt.Strategy;
const jwtExtractor = jwt.ExtractJwt;


const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) token = req.cookies[`${config.APP_NAME}_cookie`];
    
    return token;
}

const initAuthStrategies = () => {

    passport.use('login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        try {
            const user = await manager.getOne({ email });
            if (!user) {
                return done(null, false, { message: 'User not found' });
            }
            const isValid = bcrypt.compareSync(password, user.password);
            if (!isValid) {
                return done(null, false, { message: 'Invalid password' });
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));
}

passport.use('githublogin', new GitHubStrategy({
    clientID: config.GITHUB_CLIENT_ID,
    clientSecret: config.GITHUB_CLIENT_SECRET,
    callbackURL: config.GITHUB_CALLBACK_URL,
    scope: ['user:email']
}, async (req, accessToken, refreshToken, profile, done) => {
    try {
        const user = await manager.getOne({ email: profile._json.email });
        if (!user) {
            return done(null, false, { message: 'User not found' });
        }
        const isValid = isValidPassword(password, user.password);
        if (!isValid) {
            return done(null, false, { message: 'Invalid password' });
        }
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

passport.use('jwtlogin', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_SECRET
}, async (jwtPayload, done) => {
    try {
        const user = await manager.getOne({ email: jwtPayload.email });
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await user.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

export default initAuthStrategies;