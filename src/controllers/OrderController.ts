import { RequestHandler } from "express";
import { CreateOrderSchema, DeleteOrderSchema } from "../schemas/OrderSchema";
import * as OrderController from "../services/OrderService";

// ---- FUNÇÃO PARA CRIAR PEDIDOS ---- //
export const createOrder: RequestHandler = async (req, res) => {

    const data = CreateOrderSchema.safeParse(req.body);

    if (!data.success) {
        res.json({ error: data.error.flatten().fieldErrors });
        return;
    };

    const order = await OrderController.postCreateOrder({
        table: data.data.table,
        name: data.data.name
    });

    res.json(order);

};


// ---- FUNÇÃO PARA DELETAR PEDIDOS ---- //
export const deletOrder: RequestHandler = async (req, res) => {

    const data = DeleteOrderSchema.safeParse(req.query);

    if (!data.success) {
        res.json({ error: data.error.flatten().fieldErrors });
        return;
    };

    const order = await OrderController.deleteOrder({
        order_id: data.data.order_id
    });

    res.json(order);

};