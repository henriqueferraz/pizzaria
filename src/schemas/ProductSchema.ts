import { z } from "zod";

export const CreateProductSchema = z.object({
    name: z.string({ message: "Campo nome é obrigatório" }).min(2, { message: "Nome deve ter no mínimo 2 caracteres" }),
    price: z.string({ message: "Campo preço é obrigatório" }).min(1, { message: "Preço deve ter no mínimo 1 caracteres" }),
    description: z.string({ message: "Campo descrição é obrigatório" }).min(2, { message: "Descrição deve ter no mínimo 2 caracteres" }),
    banner: z.string().optional(),
    categoryId: z.string({ message: "Campo categoria é obrigatório" }).min(1, { message: "Categoria deve ter no mínimo 1 caracteres" }),
    id: z.string().optional(),
});

export const ListProductSchema = z.object({
    categoryId: z.string({ message: "Campo categoria é obrigatório" }).min(1, { message: "Categoria deve ter no mínimo 1 caracteres" }),
});