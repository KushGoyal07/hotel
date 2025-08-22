import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

export default function configurePassport(){
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    console.warn("Google OAuth env vars not set, Google login will be disabled.");
    return;
  }
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || "/api/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        let user = await User.findOne({ email });
        if (!user) {
          user = await User.create({
            name: profile.displayName || "Google User",
            email,
            password: "google-oauth",
            isAdmin: false,
            googleId: profile.id
          });
        }
        return done(null, user);
      } catch (e) {
        return done(e, null);
      }
    }
  ));
}
