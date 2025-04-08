import { Category } from "@prisma/client";
import { prisma } from "../libs/prisma";

// ---- FUNÇÃO PARA CRIAR CATEGORIAS ---- //
export const postCreateCategory =
    async ({ name }: Omit<Category, "id" | "createdAt" | "updatedAt">) => {


        // Verifica se o e-mail já existe
        const categoryAlreadyExists = await prisma.category.findFirst({
            where: { name }
        });

        if (categoryAlreadyExists) {
            throw new Error("Categoria já existe!");
        }

        // Criar nova categoria no banco
        const newCategory = await prisma.category.create({
            data: {
                name,
            },
            select: {
                id: true,
                name: true,
            }
        });
        return newCategory;
    };

//---- FUNÇÃO PARA LISTAR CATEGORIAS ---- //
export const getListCategory =
    async () => {

        const category = await prisma.category.findMany({
            select: {
                id: true,
                name: true,
            }
        });

        return category;
    };