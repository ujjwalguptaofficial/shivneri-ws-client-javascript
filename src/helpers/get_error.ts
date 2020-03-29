import { ERROR_TYPE } from "../enums/index";

export function getError(err: ERROR_TYPE, payload?) {
    const getErrorMessage = () => {
        switch (err) {
            case ERROR_TYPE.InvalidUrl:
                return `invalid web socket url ${payload}`;
            case ERROR_TYPE.NoUrlProvided:
                return `provide url in constructor`;
        }
    }


    return {
        type: err,
        message: getErrorMessage()
    };
}