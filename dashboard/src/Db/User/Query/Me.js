import gql from "graphql-tag";

export const ME_PROFILE = gql `
    query {
        me {
            firstName
            lastName
            email
            widgets {
                id
                settings
                type
            }
        }
    }
`;