import { prisma } from "../../libs/prisma";

interface ProductRequest {
    category_id: string;
}


export class ListByCategoryService {
    async execute({ category_id }: ProductRequest) {

        const findByCategory = await prisma.product.findMany({
            where: {
                category_id,
            }
        });

        return findByCategory;

    }
}