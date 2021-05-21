import expressJwt from "express-jwt";

export default function jwt() {
    const secret = process.env.SECRET;
    return expressJwt({ secret, algorithms: ['HS256'] }).unless((req: any) => {
        return (
            req.originalUrl === "/user" && req.method === "POST" ||
            req.originalUrl === "/login" && req.method === "POST" ||
            req.originalUrl === "/health" && req.method === "GET" ||
            req.originalUrl === "/agv/helix" && req.method === "GET" || 
            req.originalUrl === "/broker/update" && req.method === "GET" 
        )
    });
}