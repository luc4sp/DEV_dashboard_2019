import {stringArg, idArg, mutationType, arg} from 'nexus'
import { hash, compare } from 'bcrypt'
import { APP_SECRET , getUserId } from '../getId'
import { UpdateUserField } from "./UpdateUserField";
import { prisma } from "../generated/prisma-client";
import { sign } from 'jsonwebtoken'
import {prismaObjectType} from "nexus-prisma";


// @ts-ignore
export const Mutation = prismaObjectType({
    name: 'Mutation',
    definition: function (t) {
        t.field('signup', {
            type: 'Auth',
            args: {
                firstName: stringArg({nullable: false}),
                lastName: stringArg({nullable: false}),
                email: stringArg({nullable: false}),
                password: stringArg({nullable: false}),
            },
            resolve: async (parent, {firstName, lastName, email, password}, ctx) => {
                const hashedPassword = await hash(password, 10)
                const user = await ctx.prisma.createUser({
                    firstName,
                    lastName,
                    email,
                    password: hashedPassword,
                })
                return {
                    token: sign({userId: user.id}, APP_SECRET),
                    User: user,
                }
            },
        })


        t.field('login', {
            type: 'Auth',
            args: {
                email: stringArg({nullable: false}),
                password: stringArg({nullable: false}),
            },
            resolve: async (parent, {email, password}, context) => {
                const user = await context.prisma.user({email})
                if (!user) {
                    throw new Error('No user exist for this email: ${email}')
                }
                const passwordValid = await compare(password, user.password)
                if (!passwordValid) {
                    throw new Error('invalid password')
                }
                return {
                    token: sign({userId: user.id}, APP_SECRET),
                    User: user,
                }
            }
        });

        t.prismaFields(["createWidget", "updateWidget"]);

        t.field('updateMe', {
            type: 'User',
            args: {

                data: arg({type: "UpdateUserField", required: true})
            },
            resolve: async (parent, {data}, context) => {
                const userId: string = getUserId(context);
                if (userId) {
                    const user = await prisma.updateUser({
                        data: data,
                        where: {
                            id: userId
                        }
                    });
                    return user;
                }
            }
        });
    }
});