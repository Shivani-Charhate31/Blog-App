const jwt = require('jsonwebtoken')

const authMiddlware = (req, res, next) => {
    const auth = req.headers.Authorization || req.headers.authorization
    console.log(auth)
    if (auth && auth.startsWith('Bearer')) {
        const token = auth.split(' ')[1];
        jwt.verify(token, process.env.JWTKEY, (err, info) => {
            if (err) {
                res.status(401).json({ error: 'Unauthorized Invalid Token' })

            }
            req.user = info
            console.log(info)
            next()

        })


    } else {
        res.status(401).json({ error: 'Unauthorized No Token' })
    }

}

module.exports = { authMiddlware }