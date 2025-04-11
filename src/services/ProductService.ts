import { Product } from "@prisma/client";
import { prisma } from "../libs/prisma";

// ---- FUNÇÃO PARA CRIAR PRODUTOS ---- //
export const postCreateProduct =
    async ({ name, price, description, banner, categoryId }: Omit<Product, "id" | "createdAt" | "updatedAt">) => {

        // Verifica se o produto já existe
        const productAlreadyExists = await prisma.product.findFirst({
            where: { name }
        });

        if (productAlreadyExists) {
            throw new Error("Produto já existe!");
            return;
        }

        // Criar um novo produto no banco
        const newProduct = await prisma.product.create({
            data: {
                name,
                price,
                description,
                banner,
                categoryId,
            },
            select: {
                id: true,
                name: true,
                price: true,
                description: true,
                banner: true,
                categoryId: true,
            }
        });
        return newProduct;
    };


// ---- FUNÇÃO PARA LISTAR PRODUTOS ---- //
export const getListProduct =
    async ({ categoryId }: Omit<Product, "id" | "createdAt" | "updatedAt" | "banner" | "description" | "name" | "price">) => {

        const findByCategory = await prisma.product.findMany({
            where: {
                categoryId,
            }
        });

        if (findByCategory.length === 0) {
            throw new Error("Não existe produtos nessa categoria!");
            return;
        }
        console.log(findByCategory);
        return findByCategory;

    };