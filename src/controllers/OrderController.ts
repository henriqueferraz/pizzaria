import { RequestHandler } from "express";
import { CreateOrderSchema, OrderSchema } from "../schemas/OrderSchema";
import * as OrderService from "../services/OrderService";
import { DetailItemSchema } from "../schemas/ItemSchema";

// ---- FUNÇÃO PARA CRIAR PEDIDOS ---- //
export const createOrder: RequestHandler = async (req, res) => {

    const data = CreateOrderSchema.safeParse(req.body);

    if (!data.success) {
        res.json({ error: data.error.flatten().fieldErrors });
        return;
    };

    const order = await OrderService.postCreateOrder({
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

    const order = await OrderService.deleteOrder({
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

    const order = await OrderService.sendOrder({
        order_id: data.data.order_id
    });

    res.json(order);

};

// ---- FUNÇÃO PARA LISTAR OS PEDIDOS ENVIADOS ---- //
export const listOrder: RequestHandler = async (req, res) => {

    const orders = await OrderService.listOrder();

    res.json(orders);

};

// ---- FUNÇÃO PARA DETALHAR PEDIDOS ---- //
export const detailOrder: RequestHandler = async (req, res) => {

    const data = DetailItemSchema.safeParse(req.query);

    if (!data.success) {
        res.json({ error: data.error.flatten().fieldErrors });
        return;
    }

    const detail = await OrderService.detailOrder({
        order_id: data.data.order_id
    });

    res.json(detail);
};

// ---- FUNÇÃO PARA FINALIZAR UM PEDIDO ---- //
export const finishOrder: RequestHandler = async (req, res) => {

    const data = OrderSchema.safeParse(req.body);

    if (!data.success) {
        res.json({ error: data.error.flatten().fieldErrors });
        return;
    };

    const order = await OrderService.FinishOrder({
        order_id: data.data.order_id
    });

    res.json(order);

};