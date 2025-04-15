import { RequestHandler } from "express";
import * as ItemController from "../services/ItemService";
import { CreateItemSchema, DeleteItemSchema } from "../schemas/ItemSchema";

// ---- FUNÇÃO PARA CRIAR ITEMS NO PEDIDOS ---- //
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

// ---- FUNÇÃO PARA DELETAR ITEM NO PEDIDOS ---- //
export const deletItem: RequestHandler = async (req, res) => {

    const data = DeleteItemSchema.safeParse(req.query);

    if (!data.success) {
        res.json({ error: data.error.flatten().fieldErrors });
        return;
    };

    const order = await ItemController.deleteItemOrder({
        item_id: data.data.item_id
    });

    res.json(order);

};