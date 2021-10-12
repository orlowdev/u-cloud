const { createWriteStream } = require("fs")
const { join } = require("path")

const uploadFile = (req, res) => {
	const outputFilePath = join(
		__dirname,
		"../../../files",
		req.headers["file-path"],
	)

	const writeStream = createWriteStream(outputFilePath)

	req
		.on("error", (e) => {
			res.statusCode = 500
			res.write(e.message)
			res.end()
		})
		.on("end", () => res.end())
		.pipe(writeStream)
}

module.exports = {
	uploadFile,
}
