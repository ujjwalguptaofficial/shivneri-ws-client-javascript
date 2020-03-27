import { ERROR_TYPE } from "../enums/index";

export function getError(err: ERROR_TYPE, payload?) {
    const getErrorMessage = () => {
        switch (err) {
            case ERROR_TYPE.InvalidUrl:
                return `invalid web socket url ${payload}`;
        }
    }


    return {
        type: err,
        message: getErrorMessage()
    };
}