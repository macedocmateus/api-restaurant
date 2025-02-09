import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { AppError } from "../utils/AppError";
import { knex } from "../database/knex";

class OrdersController {
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                table_session_id: z.number(),
                product_id: z.number(),
                quantity: z.number(),
            });

            // Receber os dados
            const { table_session_id, product_id, quantity } = bodySchema.parse(
                request.body,
            );

            return response.status(201).json();
        } catch (error) {
            next(error);
        }
    }
}

export { OrdersController };
