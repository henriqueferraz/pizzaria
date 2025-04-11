import { z } from "zod";

export const ListProductSchema = z.object({
    categoryId: z.string({ message: "Campo categoria é obrigatório" }).min(1, { message: "Categoria deve ter no mínimo 1 caracteres" }),
});
