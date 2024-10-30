import {prisma} from "./prisma-client";

import {hashSync} from "bcrypt";
import {categories, ingredients, products} from "./constants";
import {Prisma} from "@prisma/client";


const randomNumber = (min: number, max: number) =>{
    return Math.floor(Math.random() * (max-min) * 10 + min * 10)/10;
}

const generateProductItem = ({productId, pizzaType, size}) :{productId: number; pizzaType? :number; size? : number;} =>{
    return{
        productId,
        price: randomNumber(160, 600),
        pizzaType,
        size
    } as Prisma.ProductItemUncheckedCreateInput
}

async function up() {

    await prisma.user.createMany({
        data: [
            {
                email: 'user@test.ru',
                fullName: 'UserTest',
                password: hashSync('11111', 10),
                verified: new Date(),
                role: 'USER'
            },
            {
                fullName: 'Admin zxc Test',
                email: 'admin@test.ru',
                password: hashSync('111111', 10),
                verified: new Date(),
                role: 'ADMIN'
            }
        ]
    });

    await prisma.category.createMany({
        data: categories,
    });

    await prisma.ingridient.createMany({
        data: ingredients,
    });

    await prisma.product.createMany({
        data: products,
    });

    const pizza1 = await prisma.product.create({
        data:{
            name: 'Пеперони фреш',
            imageUrl: 'https://media.dodostatic.net/image/r:233x233/11EE7D612FC7B7FCA5BE822752BEE1E5.avif',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(0,5),
            }
        }
    })
    const pizza2 = await prisma.product.create({
        data:{
            name: 'Сырная',
            imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(5,10),
            }
        }
    })
    const pizza3 = await prisma.product.create({
        data:{
            name: 'Чоризо',
            imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D61706D472F9A5D71EB94149304.avif',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(10,40),
            }
        }
    })

    await prisma.productItem.createMany({
        data: [
            {
                productId: pizza1.id,
                price: 300,
                pizzaType:2,
                size: 30,
            },
            {
                productId: pizza1.id,
                price: 350,
                pizzaType:1,
                size: 40,
            },
            {
                productId: pizza2.id,
                price: 250,
                pizzaType:1,
                size: 20,
            },
        ]
    })

}

async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
}

async function main() {
    try{
        await down();
        await up();
    } catch(e){
        console.error(e);
    }
}

main()
    .then(async ()=>{
        await prisma.$disconnect();
    })
    .catch(async (e)=>{
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    })