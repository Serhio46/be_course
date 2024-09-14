class ApiError extends Error {
	status;
	errors;
	constructor(status, message, errors = []) {
		super(message);
		this.status = status;
		this.errors = errors;
		this.name = this.constructor.name;
	}

	static UnauthorizedError() {
		return new ApiError(401, 'User is not authorized');
	}

	static BadRequest(message, errors = []) {
		return new ApiError(400, message, errors);
	}

	static ForbiddenError(message = 'forbidden', errors = []) {
		return new ApiError(403, message, errors);
	}
}

module.exports = ApiError;
