function FetchError(response) {
    this.message = response.statusText;
    this.status = response.status;
}

FetchError.prototype = Object.create(Error.prototype);
FetchError.prototype.name = 'FetchError';
FetchError.prototype.constructor = FetchError;

export default FetchError;
