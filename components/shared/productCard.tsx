import React from 'react';
import Link from "next/link";
import {Title} from "@/components/shared/title";
import {Button} from "@/components/ui";
import {Plus} from "lucide-react";

interface Props{
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    className?: string;
}

export const ProductCard: React.FC<Props> = ({className, id, name, price, imageUrl}) => {
    return (
        <div className={className}>
            <Link href={`/product/${id}`}>
                <div className={'flex justify-center p-6 bg-secondary rounded-lg h-[260px]'}>
                    <img className={'w-[215px] h-[215px]'} src={imageUrl} alt={name}/>
                </div>

                <div className={'sticky flex-auto '}>

                </div>

                <Title text={name} size={'sm'} className={'mb-1 mt-3 font-bold'}/>

                <p className={'text-sm text-gray-400'}>
                    Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, сосус альфредо
                </p>

                <div className={'flex items-center justify-center mt-4'}>
                    <span className={'text-[20px]'}>
                        от <b>{price} ₽</b>
                    </span>
                    <Button variant={'secondary'} className={'text-base font-bold'}>
                        <Plus className={'mr-1'} size={20}/>
                        Добавить
                    </Button>
                </div>
            </Link>
        </div>
    )
}