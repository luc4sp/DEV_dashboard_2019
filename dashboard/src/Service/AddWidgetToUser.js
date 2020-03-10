import {client} from "../App";
import {UPDATE_ME} from "../Db/User/Mutation/UpdateUser.js";

export default async function addWidgetToUser(props) {
    await client.mutate({
        mutation: UPDATE_ME,
        variables: {data : {
                widgets: {
                    connect : [{id: props.id}]
                }
            }}
    });
    return true
}