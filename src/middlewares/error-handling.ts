import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

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
    // Erro mais genérico
    return response.status(500).json({ message: error.message });
}
