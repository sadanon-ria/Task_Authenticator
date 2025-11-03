import jwt from 'jsonwebtoken'

function authMiddleware ( req, res, next ) {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // console.log("authmiddleware in if 6");
        return res.status(401).json({ message: "Authentication required" })
    }
    console.log("from authmiddleware 'authHeader' : ", authHeader)
    const token = authHeader.split(' ')[1];
    console.log("from authmiddleware 'token' : ", token)


    try {
        console.log("from authmiddleware 'Middleware JWT Secret':", process.env.JWT_SECRET);
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log("from authmiddleware 'decode': ", decoded)
        req.user = decoded;
        next();
    }catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

export default authMiddleware