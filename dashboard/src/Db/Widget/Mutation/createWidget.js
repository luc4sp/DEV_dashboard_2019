import gql from "graphql-tag";

export const CREATE_WIDGET = gql`
    mutation ($data: WidgetCreateInput!) {
        createWidget(data: $data) {
            id
            type
            settings 
        }
    }
`;