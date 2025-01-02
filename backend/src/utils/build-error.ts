import Boom from '@hapi/boom';

const buildError = (err: any) => {
    if (err.isBoom) {
        return {
            message: err.output.payload.message,
            code: err.output.statusCode,
            details: err.output.payload.error || err.data,
        };
    } else if (err.name === 'ValidationError') {
        return {
            message: 'Validation Error',
            code: 400,
            details: err.details || err.message,
        };
    } else if (err.name === 'NotFoundError') {
        return {
            message: err.message || 'Not Found',
            code: 404,
        };
    } else {
        return {
            message: 'Internal Server Error',
            code: 500,
            details: err.message,
        };
    }
};

export default buildError;