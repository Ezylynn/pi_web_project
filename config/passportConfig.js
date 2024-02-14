const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const {User} = require("../models/user")

passport.use(new LocalStrategy(
    async function(username, password, done){
        try{
            const user = await User.findByUsername(username);
            

            if (!user) return done(null, false, {message: 'User not found'})

            const isMatch = await user.verifyPassword(password);

            if (!isMatch) return done (null, false, {message: `Incorrect password for ${username}`})

            if (user) return done(null, user);
        }catch(err){
            done(err)
        }

}))


passport.serializeUser((user,done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try{
        const user = await User.findById(id);
        done(null, user);
    }catch(err){
        done(err);
    }
})

module.exports = { passport }
