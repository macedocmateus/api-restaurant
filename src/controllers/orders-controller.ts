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

            // Recebendo os dados
            const { table_session_id, product_id, quantity } = bodySchema.parse(
                request.body,
            );

            // Tratando as exceções do table session (sessão da mesa) na tabela de sessões das mesas
            const session = await knex<TablesSessionsRepository>(
                "tables_sessions",
            )
                .where({ id: table_session_id })
                .first();

            // Verifica se a sessão existe
            if (!session) {
                throw new AppError("session table not found");
            }

            // Verifica se a sessão está fechada
            if (session.closed_at) {
                throw new AppError("this table is closed");
            }

            // Tratando as exceções do product (produto) na tabela de produtos
            const product = await knex<ProductRepository>("products")
                .where({ id: product_id })
                .first();

            // Verifica se o produto existe
            if (!product) {
                throw new AppError("product not found");
            }

            await knex<OrderRepository>("orders").insert({
                product_id,
                table_session_id,
                quantity,
                price: product.price,
            });

            return response.status(201).json();
        } catch (error) {
            next(error);
        }
    }

    async index(request: Request, response: Response, next: NextFunction) {
        try {
            const { table_session_id } = request.params;
            const order = await knex("orders")
                .select(
                    "orders.id",
                    "orders.table_session_id",
                    "orders.product_id",
                    "products.name as product_name",
                    "orders.price as order_price",
                    "orders.quantity",
                )
                .join("products", "products.id", "orders.product_id")
                .where({ table_session_id });

            // Recuperando a sessão da mesa
            const session = await knex<TablesSessionsRepository>(
                "tables_sessions",
            )
                .where({ id: Number(table_session_id) })
                .first();

            // Verifica se a sessão da mesa existe
            if (!session) {
                throw new AppError(" table session not found");
            }

            return response.json(order);
        } catch (error) {
            next(error);
        }
    }
}

export { OrdersController };
