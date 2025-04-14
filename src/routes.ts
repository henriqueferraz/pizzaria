import { Router } from "express";
import multer from "multer";

import * as pingController from "./controllers/ping";
import * as userController from "./controllers/UserController";
import * as categoryController from "./controllers/CategoryController";
import * as productController from "./controllers/ProductController";
import * as orderController from "./controllers/OrderController";
import * as itemController from "./controllers/ItemController";

import { isAuthenticated } from "./middlewares/isAuthenticated";
import uploadConfig from "./config/multer";

export const router = Router();
const upload = multer(uploadConfig.upload("./public/uploads"));

//---- ROTAS NÃO PROTEGIDAS ----//
//---- ROTAS DE TESTE ----//
router.get('/ping', pingController.ping);

//---- ROTAS USUÁRIOS ----//
router.post('/users', userController.createUser);

//---- ROTAS DE AUTENTICAÇÃO ----//
router.post('/session', userController.authUser);

//--------------------------------------------------------------------------------//
//---- ROTAS PROTEGIDAS ----//
//---- ROTAS PARA LISTAR USUÁRIO ----//
router.get('/me', isAuthenticated, userController.detailUser);

//---- ROTAS PARA CRIAR CATEGORIAS ----//
router.post('/category', isAuthenticated, categoryController.createCategory);

//---- ROTAS PARA LISTAR CATEGORIAS ----//
router.get('/category', isAuthenticated, categoryController.listCategory);

//---- ROTAS PARA CRIAR PRODUTOS ----//
router.post('/product', isAuthenticated, upload.single('banner'), productController.createProduct);

//---- ROTAS PARA LISTAR PRODUTOS ----//
router.get('/product', isAuthenticated, productController.listProduct);

//---- ROTAS PARA CRIAR PEDIDOS ----//
router.post('/order', isAuthenticated, orderController.createOrder);

//---- ROTAS PARA DELETAR PEDIDOS ----//
router.delete('/order', isAuthenticated, orderController.deletOrder);

//---- ROTAS PARA CRIAR ITEMS NO PEDIDO ----//
router.post('/order/add', isAuthenticated, itemController.createItem);