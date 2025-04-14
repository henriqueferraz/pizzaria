import { RequestHandler } from "express";
import { CreateUserSchema } from "../schemas/UserSchema";
import { getDetailUser, postAuthUser, postCreateUser } from "../services/UserService";


// ---- FUNÇÃO PARA CRIAR USUÁRIO ---- //
export const createUser: RequestHandler = async (req, res) => {

    const data = CreateUserSchema.safeParse(req.body);

    if (!data.success) {
        res.json({ error: data.error.flatten().fieldErrors });
        return;
    }

    const user = await postCreateUser({
        name: data.data.name,
        email: data.data.email,
        password: data.data.password,
    });

    res.json(user);
};

// ---- FUNÇÃO PARA VERIFICAR SE USUÁRIO EXISTE ---- //
export const authUser: RequestHandler = async (req, res) => {

    const data = CreateUserSchema.safeParse(req.body);

    if (!data.success) {
        res.json({ error: data.error.flatten().fieldErrors });
        return;
    }

    const user = await postAuthUser({
        email: data.data.email,
        password: data.data.password,
    });

    res.json(user);
};

// ---- FUNÇÃO MOSTAR OS DETALHES DO USUÁRIO ---- //
export const detailUser: RequestHandler = async (req, res) => {

    const data = req.user_id;

    const user = await getDetailUser({
        id: data,
    });

    res.json(user);
}
