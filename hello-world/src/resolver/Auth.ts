import { objectType } from 'nexus'

export const Auth = objectType({
    name: 'Auth',
    definition(t) {
        t.string('token')
        t.field('User', { type: 'User' })
    }
})