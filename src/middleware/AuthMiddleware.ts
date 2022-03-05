import {verify} from 'jsonwebtoken';

export class AuthMiddleware {
    static verifyToken = async (req, res, next) => {

        if (!req.headers["authorization"] || !req.headers["authorization"].startsWith("Bearer ")) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }

        const token = req.headers["authorization"].substring(7);

        verify(token, process.env.secret, (err, decoded) => {
            console.log(err);
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized!"
                });
            }
            console.log(decoded);
            req.userId = decoded.jti;
            req.roles = decoded.roles;
            next();
        });
    }

    static hasRole = async (req, res, next) => {
        console.log(req.userId, req.roles);

        if (req.baseUrl.startsWith('/api/admin')) {
            if (req.roles.indexOf('ROLE_ADMIN') < 0) {
                return res.status(401).send({
                    message: "Admin Role is needed!"
                });
            }
        } else if (req.url.startsWith('/api/moderator')) {
            if (req.roles.indexOf('ROLE_MODERATOR') < 0) {
                return res.status(401).send({
                    message: "Moderator Role is needed!"
                });
            }
        }

        next();
    }
}