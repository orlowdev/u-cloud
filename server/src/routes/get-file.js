const { join } = require("path")
const { createReadStream } = require("fs")

const { U_CLOUD_LOGIN, U_CLOUD_PASS } = process.env
const loginString = `${U_CLOUD_LOGIN}:${U_CLOUD_PASS}`
const loginB64 = Buffer.from(loginString).toString("base64")
const expectedAuthorizationHeader = `Basic ${loginB64}`

const getFile = (req, res) => {
	const filePath = join(__dirname, "../../../files", req.url)

	res.setHeader("content-encoding", "gzip")
	res.setHeader("content-type", "text/html")
	res.setHeader("www-authenticate", "Basic realm='Restricted Access'")

	if (req.headers["authorization"] !== expectedAuthorizationHeader) {
		res.statusCode = 401
		res.end()
		return
	}

	const readStream = createReadStream(filePath)

	readStream
		.on("error", () => {
			res.statusCode = 404
			res.end()
		})
		.pipe(res)
}

module.exports = {
	getFile,
}
