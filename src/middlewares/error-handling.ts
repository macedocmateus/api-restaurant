import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { ZodError } from "zod";

export function errorHandling(
    error: any,
    request: Request,
    response: Response,
    _: NextFunction,
) {
    // Erro personalizado
    if (error instanceof AppError) {
        return response
            .status(error.statusCode)
            .json({ message: error.message });
    }

    if (error instanceof ZodError) {
        return response
            .status(400)
            .json({ message: "validation error", issues: error.format() });
    }

    // Erro mais genérico
    return response.status(500).json({ message: error.message });
}
