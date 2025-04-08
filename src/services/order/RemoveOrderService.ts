import { prisma } from "../../libs/prisma";

interface OrderRequest {
    order_id: string;
}

export class RemoveOrderService {
    async execute({ order_id }: OrderRequest) {
        const order = await prisma.order.delete({
            where: {
                id: order_id
            }
        });

        return order;
    }
}