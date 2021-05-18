const middleware = {}

middleware['auth-admin'] = require('..\\middleware\\auth-admin.js')
middleware['auth-admin'] = middleware['auth-admin'].default || middleware['auth-admin']

export default middleware
