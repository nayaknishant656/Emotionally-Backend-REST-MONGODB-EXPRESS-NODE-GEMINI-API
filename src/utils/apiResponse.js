/**
 * Standard API Response Helper
 * Use this across controllers for consistent response formatting.
 */
class ApiResponse {
    static success(res, { statusCode = 200, message = 'Success', data = null, pagination = null }) {
        const response = { success: true, message, data };
        if (pagination) response.pagination = pagination;
        return res.status(statusCode).json(response);
    }

    static error(res, { statusCode = 500, message = 'Internal Server Error', errors = null }) {
        const response = { success: false, message };
        if (errors) response.errors = errors;
        return res.status(statusCode).json(response);
    }
}

module.exports = ApiResponse;
