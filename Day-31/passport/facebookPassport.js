const FacebookStrategy = require("passport-facebook");
const model = require("../models/index");
const Provider = model.Provider;
const User = model.User;

module.exports = new FacebookStrategy(
    {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        scope: ["email"],
        profileFields: ["id", "displayName", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        const { displayName, emails, provider } = profile;
        let providerDetail = await Provider.findOne({
            where: {
                name: provider,
            },
        });
        let providerId;
        if (!providerDetail) {
            providerDetail = await Provider.create({ name: provider });
        }
        providerId = providerDetail.id;
        const email = emails[0].value;
        let user = await User.findOne({
            where: {
                email: email,
                provider_id: providerId,
            },
        });
        console.log(user);
        if (!user) {
            user = await User.create({
                name: displayName,
                email: email,
                provider_id: providerId,
            });
        }

        done(null, user);
    }
);
