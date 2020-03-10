import {client} from "../App";
import {CREATE_WIDGET} from "../Db/Widget/Mutation/createWidget";

export default async function addWidget(props) {
    let mutate = await client.mutate({
        mutation: CREATE_WIDGET,
        variables: {data: props}
    });
    return mutate.data.createWidget
}