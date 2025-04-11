import { prisma } from "../libs/prisma";
import { CreateOrderSchema, DeleteOrderSchema } from "../schemas/CreateOrderSchema";
import { z } from "zod";

export const postCreateOrder =
    async ({ table, name }: z.infer<typeof CreateOrderSchema>) => {

        // Criar um novo produto no banco
        const newProduct = await prisma.order.create({
            data: {
                table,
                name
            },
            select: {
                id: true,
                name: true,
                table: true,
                status: true,
                draft: true,
                createdAt: true,
                updatedAt: true,

            }
        });

        return newProduct;
    };

export const deleteOrder =
    async ({ order_id }: z.infer<typeof DeleteOrderSchema>) => {

        // Criar um novo produto no banco
        const newProduct = await prisma.order.delete({
            where: {
                id: order_id
            },
            select: {
                id: true,
                name: true,
                table: true,
                status: true,
                draft: true,
                createdAt: true,
                updatedAt: true,

            }
        });

        return newProduct;
    };