import { prisma } from "../../libs/prisma";

interface OrderRequest {
    table: number;
    name: string;
}

export class CreateOrderService {
    async execute({ name, table }: OrderRequest) {

        const order = await prisma.order.create({
            data: {
                name,
                table,
            }
        });

        return order;

    };
};