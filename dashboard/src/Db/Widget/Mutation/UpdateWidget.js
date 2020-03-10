import gql from "graphql-tag";

export const UPDATE_WIDGET = gql `
    mutation($data: WidgetUpdateInput!, $where: WidgetWhereUniqueInput!) {
        updateWidget(where: $where, data: $data) {
            id
            type
            settings
        }
    }
`;