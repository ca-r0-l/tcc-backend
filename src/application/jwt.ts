import expressJwt from "express-jwt";

export default function jwt() {
    const secret = process.env.SECRET;
    return expressJwt({ secret, algorithms: ['HS256'] }).unless({
        path: [
            '/login',
            '/health',
            '/agv/helix',
            '/user'
        ]
    });
}
