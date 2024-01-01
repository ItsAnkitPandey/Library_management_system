import jwt from 'jsonwebtoken'
const JWT_SECRET = "admin"


const fetchAdmin = (req, res, next) => {
    // Get the admin from the jwt token and add id to req object
    const token = req.header('authtoken');
    if (!token) {
        res.status(401).send({ error: "Please authenticate with the valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.admin = data.admin;
        next();
    }
    catch (error) {
        res.status(401).send({ error: "Please authenticate with the valid token" })

    }
}

export default fetchAdmin;