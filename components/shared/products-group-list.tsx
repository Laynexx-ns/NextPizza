import React from 'react';
import { Title } from './title';
import {cn} from "@/lib/utils";
import {ProductCard} from "@/components/shared/productCard";

interface Props {
    title: string;
    items: any[];
    listClassName?: string;
    categoryId: number;
    className?: string;
}

export const ProductsGroupList: React.FC<Props> = (
    {className, title, items, listClassName, categoryId}) =>
{
    return (
        <div className={className}>
            <Title text={title} size={'lg'} className={'font-extrabold mb-5'}/>

            <div className={cn('grid grid-cols-3 gap-[50px]', className)}>
                {
                    items.map((product, i) =>(
                        <ProductCard
                            key={i}
                            id={product.id}
                            name={product.name}
                            imageUrl={product.imageUrl}
                            price={product.items[0].price}
                        />
                    ))
                }
            </div>
        </div>
    )
}