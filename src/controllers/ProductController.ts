import { RequestHandler } from "express";
import { CreateProductSchema } from "../schemas/CreateProductSchema";
import { postCreateProduct, getListProduct } from "../services/ProductService";
import { ListProductSchema } from "../schemas/ListProductSchema";

// ---- FUNÇÃO PARA CRIAR PRODUTOS ---- //
export const createProduct: RequestHandler = async (req, res) => {

    const data = CreateProductSchema.safeParse(req.body);

    if (!data.success) {
        res.json({ error: data.error.flatten().fieldErrors });
        return;
    };

    if (!req.file) {
        res.json({ error: "Imagem obrigatória!" });
        return;
    } else {

        const { filename: banner } = req.file;

        const category = await postCreateProduct({
            name: data.data.name,
            price: data.data.price,
            description: data.data.description,
            banner,
            categoryId: data.data.categoryId,
        });

        res.json(category);
    };

};


// ---- FUNÇÃO PARA LISTAR PRODUTOS ---- //
export const listProduct: RequestHandler = async (req, res) => {

    const data = ListProductSchema.safeParse(req.body);

    if (!data.success) {
        res.json({ error: data.error.flatten().fieldErrors });
        return;
    };

    const category = await getListProduct({
        categoryId: data.data.categoryId,
    });

    res.json(category);
};