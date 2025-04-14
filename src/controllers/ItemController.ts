import { RequestHandler } from "express";
import * as ItemController from "../services/ItemService";
import { CreateItemSchema } from "../schemas/ItemSchema";

// ---- FUNÇÃO PARA CRIAR PEDIDOS ---- //
export const createItem: RequestHandler = async (req, res) => {

    const data = CreateItemSchema.safeParse(req.body);

    if (!data.success) {
        res.json({ error: data.error.flatten().fieldErrors });
        return;
    };

    const item = await ItemController.postAddOrder({
        order_id: data.data.order_id,
        amount: data.data.amount,
        product_id: data.data.product_id
    });

    res.json(item);

};