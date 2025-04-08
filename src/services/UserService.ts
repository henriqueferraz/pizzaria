import { User } from "@prisma/client";
import { prisma } from "../libs/prisma";
import { hash } from "bcryptjs";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

// ---- FUNÇÃO PARA CRIAR USUÁRIO ---- //
export const postCreateUser =
    async ({ email, password, name }: Omit<User, "id" | "createdAt" | "updatedAt">) => {


        // Verifica se o e-mail já existe
        const userAlreadyExists = await prisma.user.findUnique({
            where: { email }
        });

        if (userAlreadyExists) {
            throw new Error("E-mail já existe!");
        }

        // Criptografar a senha
        const passwordHash = await hash(password, 8);

        // Criar novo usuário no banco
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: passwordHash,
            },
        });

        return newUser;
    };

// ---- FUNÇÃO PARA VERIFICAR SE USUÁRIO EXISTE ---- //

export const postAuthUser =
    async ({ email, password }: Omit<User, "createdAt" | "updatedAt" | "name" | "id">) => {


        // VERIFICAR SE O EMAIL EXISTE
        const user = await prisma.user.findFirst({
            where: { email }
        });

        if (!user) {
            throw new Error("Usuário ou senha incorreta! usuario");
        }

        // VERIFICAR SE A SENHA ESTÁ CORRETA
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("Usuário ou senha incorreta! senha");
        }

        // GERAR TOKEN JWT
        const jwtSecret = process.env.JWT_SECRET;

        if (!jwtSecret) {
            throw new Error("JWT_SECRET não está definido nas variáveis de ambiente.");
        }


        const token = sign(
            {
                email: user.email,
                name: user.name
            },
            jwtSecret,
            {
                subject: user.id,
                expiresIn: "1d"
            }
        );

        return {
            id: user.id,
            email: user.email,
            name: user.name,
            token
        };
    };

// ---- FUNÇÃO PARA MOSTRAR OS DETALES DO USUÁRIO ---- //
export const getDetailUser =
    async (data: { id: string }) => {

        if (data === undefined) {
            throw new Error("Informe o ID do usuário!");
        }

        const user = await prisma.user.findFirst({
            where: {
                id: data.id
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            }
        })

        return (user);
    };