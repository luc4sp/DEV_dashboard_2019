import gql from "graphql-tag";

export const UPDATE_ME = gql `
    mutation updateMe($data: UpdateUserField!) {
        updateMe(data: $data) {
            email,
            firstName,
            lastName,
            type
        }
    }
`;