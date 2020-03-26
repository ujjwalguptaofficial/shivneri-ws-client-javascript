import { IMessageFromServer } from "../interfaces/index";

export const convertMessage = function (message: IMessageFromServer) {
    switch (message.data_type) {
        case "string":
            return message.data
        case "number":
            return Number(message.data);
        case "json":
            return JSON.parse(message.data);
        case "bool":
        case "boolean":
            return message.data === "true";

    }
    return message.data
}