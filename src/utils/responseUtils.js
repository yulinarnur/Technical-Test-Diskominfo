export const sendResponse = (res, code, message, data) => {
    return res.status(code).json({
        message,
        data,
    });
};

export const sendErrResponse = (res, code, message, errors) => {
    const response = { message };
    if (errors) {
        response.errors = errors; 
    }
    return res.status(code).json(response);
};
