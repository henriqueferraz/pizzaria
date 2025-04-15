import { prisma } from "../libs/prisma";
import { DetailItemSchema } from "../schemas/ItemSchema";
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
        const listOrder = await prisma.order.findMany({
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

        return listOrder;
    };

export const detailOrder =
    async ({ order_id }: z.infer<typeof DetailItemSchema>) => {

        const detailOrder = await prisma.item.findMany({
            where: {
                orderId: order_id
            },
            select: {
                amount: true,
                id: true,
                productId: true,
                order: {
                    select: {
                        name: true,
                        table: true,
                        status: true,
                        draft: true,
                        createdAt: true,
                        updatedAt: true,
                    }
                },
                product: {
                    select: {
                        name: true,
                        description: true,
                        price: true,
                        category: true,
                        createdAt: true,
                        updatedAt: true,
                    }
                },
            }
        });

        return detailOrder;
    };

export const FinishOrder =
    async ({ order_id }: z.infer<typeof OrderSchema>) => {

        // Finalizar um pedido no banco
        const finishOrder = await prisma.order.update({
            where: {
                id: order_id
            },
            data: {
                status: true,
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

        return finishOrder;
    };