import { ERROR_TYPE } from "../enums/index";
export declare function getError(err: ERROR_TYPE, payload?: any): {
    type: ERROR_TYPE;
    message: string;
};
