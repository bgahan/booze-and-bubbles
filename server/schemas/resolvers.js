const { AuthenticationError } = require('apollo-server-express');
const { User, Cocktail } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('cocktails');

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('cocktails');
        },
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('cocktails');
        },
        cocktails: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Cocktail.find(params).sort({ createdAt: -1 });
        },
        cocktails: async (parent, { _id }) => {
            return Cocktail.findOne({ _id });
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
        saveCocktail: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    {$addToSet: { savedCocktails: args.input}},
                    {new: true}
                )

                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
    }
};

module.exports = resolvers;