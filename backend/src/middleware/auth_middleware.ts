import { Request, Response, NextFunction } from "express";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import auth from '../config/auth.js';


export default async function checkAuth(req: Request, res: Response, next: NextFunction){
    try {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers)
        });

        if (!session){
            res.status(401).json({
                sucess:false,
                message:"User not authorised"
            });
            return;
        }

        req.authUser={ 
            id:session.user.id,
            name:session.user.name,
            email:session.user.email
        };

        next();
    }
    catch (err) {
        next(err)
    }
}