import { z } from "zod";

export const CreateOrderSchema = z.object({
    table: z.number({ message: "Campo mesa é obrigatório" }).min(1, { message: "Mesa deve ter no mínimo 1 caracteres" }),
    name: z.string().min(2, { message: "Nome deve ter no mínimo 2 caracteres" }).optional(),
    order_id: z.string().optional(),
});

export const OrderSchema = z.object({
    order_id: z.string()
});
