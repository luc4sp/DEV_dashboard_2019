import gql from "graphql-tag"
import { Auth } from '../token'

export const loginMutationVar = {
    email: String,
    password: String
}

export const loginMutationData = {
    login: Auth
}

export const LOGIN_ = gql `
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
        }
    }
`;