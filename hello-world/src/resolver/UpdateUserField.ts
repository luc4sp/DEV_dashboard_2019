import {inputObjectType, objectType} from "nexus";

export const UpdateUserWidgetsInput = inputObjectType({
    name: "UpdateUserWidgetsInput",
    definition(t) {
        t.list.field('connect', {type: "WidgetWhereUniqueInput"})
        t.list.field('disconnect', {type: "WidgetWhereUniqueInput"})
    },
})

export const UpdateUserField = inputObjectType({
    name: 'UpdateUserField',
    definition(t) {
        t.string('email'),
        t.string('firstName'),
        t.string('lastName'),
        t.field('widgets', {type: "UpdateUserWidgetsInput" as any})
    },
});