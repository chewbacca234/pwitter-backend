module.exports = function checkUserBody(body, keys) {
    for (const field of keys) {
        if (!body[field] || body[field].trim() === '') {
            return false;
        } else {
            return true;
        }
    }
}