import { RequestHandler } from "express";
import { CreateCategorySchema } from "../schemas/CreateCategorySchema";
import { getListCategory, postCreateCategory } from "../services/CategoryService";

// ---- FUNÇÃO PARA CRIAR CATEGORIAS ---- //
export const createCategory: RequestHandler = async (req, res) => {

    const data = CreateCategorySchema.safeParse(req.body);

    if (!data.success) {
        res.json({ error: data.error.flatten().fieldErrors });
        return;
    }

    const category = await postCreateCategory({
        name: data.data.name,
    });

    res.json(category);
};

//---- FUNÇÃO PARA LISTAR CATEGORIAS ---- //
export const listCategory: RequestHandler = async (req, res) => {

    const category = await getListCategory();

    res.json(category);
};