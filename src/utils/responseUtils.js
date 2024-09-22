export const sendResponse = (res, code, message, data) => {
    return res.status(code).json({
        message,
        data,
    });
};

export const sendErrResponse = (res, code, message) => {
    return res.status(code).json({
        message,
    });
};
