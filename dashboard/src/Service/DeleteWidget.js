import {client} from "../App";
import {UPDATE_ME} from "../Db/User/Mutation/UpdateUser.js";

export default async function disconnectWidget(props) {
    await client.mutate({
        mutation: UPDATE_ME,
        variables: {data : {
                widgets: {
                    disconnect : [{id: props.id}]
                }
            }}
    });
    return true
}