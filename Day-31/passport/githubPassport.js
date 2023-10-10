const GitHubStrategy = require("passport-github").Strategy;
const model = require("../models/index");

const Provider = model.Provider;
const User = model.User;

module.exports = new GitHubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        const { username, emails, provider } = profile;
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
                name: username,
                email: email,
                provider_id: providerId,
            });
        }

        done(null, user);
    }
);
