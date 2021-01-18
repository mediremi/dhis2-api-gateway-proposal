const axios = require("axios")

const baseURL = "https://debug.dhis2.org/2.35dev"

class ApiClient {
    constructor({ jsessionID }) {
        this.client = axios.create({
            baseURL,
            timeout: 30e3,
            maxContentLength: 1 * 1024 * 1024,
            headers: { Cookie: `JSESSIONID=${jsessionID}` },
            validateStatus: status => status == 200,
        })
    }

    get(url) {
        return this.client.get(url).then(({ data }) => data)
    }
}

module.exports = ApiClient
