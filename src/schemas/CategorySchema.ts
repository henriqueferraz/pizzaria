import { z } from "zod";

export const CreateCategorySchema = z.object({
    name: z.string({ message: "Campo nome é obrigatório" }).min(2, { message: "Nome deve ter no mínimo 2 caracteres" }),
    id: z.string().optional(),
});