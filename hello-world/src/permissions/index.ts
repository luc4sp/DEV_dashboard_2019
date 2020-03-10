import { rule, shield, and } from 'graphql-shield'
import { getUserId } from '../getId'

const rules = {
    isAuthedUser: rule()((parent, args, context) => {
        const userId = getUserId(context)
        return Boolean(userId)
    }),
    idAdminUser: rule()(async (parent, args, context) => {
        const userId = getUserId(context)
        const user = await context.prisma.user({id: userId});

        if (user.type == "ADMIN")
            return (true);
        return (false);
    }),
}

export const permissions = shield(
    {
        Query: {
            me: rules.isAuthedUser,
            users: and(rules.isAuthedUser, rules.idAdminUser),
            user: and(rules.isAuthedUser, rules.idAdminUser),
            usersConnection: and(rules.isAuthedUser, rules.idAdminUser),
        },
        Mutation: {
            updateMe: rules.isAuthedUser,
            createWidget: rules.isAuthedUser,
            updateWidget: rules.isAuthedUser
        },
    }
)