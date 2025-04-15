import { prisma } from "../libs/prisma";
import { CreateOrderSchema, OrderSchema } from "../schemas/OrderSchema";
import { z } from "zod";

export const postCreateOrder =
    async ({ table, name }: z.infer<typeof CreateOrderSchema>) => {

        // Criar um novo pedido no banco
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
    async ({ order_id }: z.infer<typeof OrderSchema>) => {

        // Deletar um pedido no banco
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


export const sendOrder =
    async ({ order_id }: z.infer<typeof OrderSchema>) => {

        // Atualizar um novo pedido no banco
        const newOrder = await prisma.order.update({
            where: {
                id: order_id
            },
            data: {
                draft: false,
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

        return newOrder;
    };


export const listOrder =
    async () => {

        // Listar todos os pedidos no banco aprovados
        const listOrders = await prisma.order.findMany({
            where: {
                draft: false,
                status: false,
            },
            orderBy: {
                createdAt: "desc"
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
        console.log(listOrders);

        return listOrders;
    };