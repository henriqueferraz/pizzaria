import { Request, Response } from "express";
import { CreateOrderService } from "../../services/order/CreateOrderService";

export class CreateOrderController {
    async handle(req: Request, res: Response) {

        const { name, table } = req.body;
        const createOrderController = new CreateOrderService();
        const order = await createOrderController.execute({
            name,
            table,
        });

        res.json(order);

    }
}   