import { prisma } from "../libs/prisma";
import { CreateItemSchema, DeleteItemSchema } from "../schemas/ItemSchema";
import { z } from "zod";

export const postAddOrder =
    async ({ order_id, amount, product_id }: z.infer<typeof CreateItemSchema>) => {

        // Adicionar um produto no pedido
        const newItem = await prisma.item.create({
            data: {
                order: {
                    connect: {
                        id: order_id
                    }
                },
                amount,
                product: {
                    connect: {
                        id: product_id
                    }
                }
            },
            select: {
                id: true,
                order: {
                    select: {
                        table: true,
                        status: true,
                        name: true
                    }
                },
                amount: true,
                product: {
                    select: {
                        name: true,
                        description: true,
                    }
                },
                createdAt: true,
                updatedAt: true,
            },
        });

        return newItem;
    };


export const deleteItemOrder =
    async ({ item_id }: z.infer<typeof DeleteItemSchema>) => {

        // Deletar um pedido no banco
        const deleteItem = await prisma.item.delete({
            where: {
                id: item_id
            },
            select: {
                id: true,
                order: {
                    select: {
                        table: true,
                        status: true,
                        name: true
                    }
                },
                amount: true,
                product: {
                    select: {
                        name: true,
                        description: true,
                    }
                },
                createdAt: true,
                updatedAt: true,

            }
        });

        return deleteItem;
    };
