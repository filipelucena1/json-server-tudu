import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

class AppError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number = 400) {
        super(message);
        this.statusCode = statusCode;
    }
}

const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
    }

    if (err instanceof ZodError) {
        const errors = Object.keys(err.flatten().fieldErrors).length === 0? err.errors[0].message : err.flatten().fieldErrors
        return res.status(400).json({ message: errors});
    }

    console.error(err);
    return res.status(500).json({ message: "Internal Server Error." });
};

export { AppError, errorHandler };
