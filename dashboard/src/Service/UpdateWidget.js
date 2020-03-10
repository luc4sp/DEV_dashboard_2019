import {client} from "../App";
import {UPDATE_WIDGET} from "../Db/Widget/Mutation/UpdateWidget";

export default async function updateWidgetSettings(props) {
    await client.mutate({
        mutation: UPDATE_WIDGET,
        variables: {
            where: {id: props.id},
            data: {
                settings: props.settings
            }
        }
    })
}