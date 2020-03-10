import { prismaObjectType } from 'nexus-prisma'

export const Widget = prismaObjectType({
    name: 'createWidget',
    definition(t) {
        t.prismaFields(['*'])
    },
})