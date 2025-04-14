import { z } from "zod";

export const CreateUserSchema = z.object({
    name: z.string({ message: "Campo nome é obrigatório" }).min(2, { message: "Nome deve ter no mínimo 2 caracteres" }),
    email: z.string({ message: "Campo email é obrigatório" }).email({ message: "email inválido" }),
    password: z.string({ message: "Campo senha é obrigatório" }).min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
    id: z.string().optional(),
});