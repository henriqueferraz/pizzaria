import { RequestHandler } from "express";
import { CreateOrderSchema, OrderSchema } from "../schemas/OrderSchema";
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

    const data = OrderSchema.safeParse(req.query);

    if (!data.success) {
        res.json({ error: data.error.flatten().fieldErrors });
        return;
    };

    const order = await OrderController.deleteOrder({
        order_id: data.data.order_id
    });

    res.json(order);

};


// ---- FUNÇÃO PARA ALTERAR O PEDIDO PARA ENVIO ---- //
export const sendOrder: RequestHandler = async (req, res) => {

    const data = OrderSchema.safeParse(req.body);

    if (!data.success) {
        res.json({ error: data.error.flatten().fieldErrors });
        return;
    };

    const order = await OrderController.sendOrder({
        order_id: data.data.order_id
    });

    res.json(order);

};

// ---- FUNÇÃO PARA LISTAR OS PEDIDOS ENVIADOS ---- //
export const listOrder: RequestHandler = async (req, res) => {

    const orders = await OrderController.listOrder();

    res.json(orders);

};