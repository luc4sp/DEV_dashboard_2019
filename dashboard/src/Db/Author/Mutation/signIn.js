import gql from "graphql-tag"
import { Auth } from "../token"

export const signInVars = {
    firstName: String,
    lastName: String,
    email: String,
    password: String
}

export const signInData = {
    signIn: Auth
}

export const SIGNIN_ = gql`
    mutation signup($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
        signup(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
            token
        }
    }
`;