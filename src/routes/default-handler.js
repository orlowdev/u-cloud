const defaultHandler = (_, res) => {
	res.statusCode = 404
	res.end()
}

module.exports = {
	defaultHandler,
}
