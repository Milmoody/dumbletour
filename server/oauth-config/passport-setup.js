// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20');
// // const authKeys = require('./auth-keys');
// const User = require('../db/mongo/user-model');

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id).then((user) => {
//     done(null, user);
//   })
// });

// passport.use(
//   new GoogleStrategy({
//     // options for the google strategy
//     callbackURL:'/auth/google/redirect',
//     clientID: authKeys.google.clientID,
//     clientSecret: authKeys.google.clientSecret,
//   }, (accessToken, refreshToken, profile, done) => {
//     // passport callback function
//     console.log('passport cb function fired');
//     console.log(profile);

//     // check if user already exists
//     User.findOne({googleId: profile.id}).then((currentUser) => {
//       if (currentUser) {
//         // User already exists
//         console.log('user already exists:', currentUser);
//         done(null, currentUser);
//       } else {
//         // if not, create new user
//         new User({
//           username: profile.displayName,
//           googleId: profile.id,
//           userImg: profile._json.picture,
//           email: profile.email,
//           itinerary: [],
//         }).save().then((newUser) => {
//           console.log('New user created:', newUser)
//           done(null, newUser);
//         }).catch(err => console.log('you got an error!', err));
//       }
//     });
//   })
// );