import { getUserId } from '../getId'
import { stringArg, idArg, queryType } from 'nexus'
import { prismaObjectType } from 'nexus-prisma'

// @ts-ignore
export const Query = prismaObjectType({
    name: 'Query',
    definition(t) {
        t.field('me', {
            type: 'User',
            resolve: (parent, args, ctx) => {
                const userId = getUserId(ctx)
                return ctx.prisma.user({ id: userId })
            },
        }),
        t.prismaFields(["*"])
    },
})