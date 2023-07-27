import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppError } from "../errors";
import { z } from "zod";

export const ensureIsValidId =
    (repo: Repository<any>) =>
    async (req: Request, res: Response, next: NextFunction) => {
        const { params } = req;

        if (!params.id) {
            throw new AppError("Invalid id", 404);
        }

        const uuidFormat = z.string().uuid("id was not found")
        uuidFormat.parse(params.id)

        const searchDataOnRepo = await repo.findOne({
            where: { id: params.id }
        });
        if (!searchDataOnRepo) {
            throw new AppError("id was not found", 404);
        }
        console.log("next");
        
        return next();
    };
