import { z } from "zod";

export const CreateItemSchema = z.object({
    order_id: z.string({ message: "Informe uma mesa" }).min(1, { message: "Mesa deve ter no mínimo 1 caracteres" }),
    amount: z.number({ message: "Campo quantidade é obrigatório" }).min(1, { message: "Quantidade deve ter no mínimo 1 caracteres" }),
    product_id: z.string({ message: "Informe um produto" }).min(1, { message: "Produto deve ter no mínimo 1 caracteres" })
});
