'use client'


import React from 'react';
import { Title } from './title';
import {cn} from "@/lib/utils";
import {ProductCard} from "@/components/shared/productCard";
import {useIntersection} from "react-use";
import {useCategoryStore} from "@/store/category";

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
    const setActiveCategoryId = useCategoryStore((state) => state.setActiveId)
    const intersectionRef = React.useRef(null);
    const intersection = useIntersection(intersectionRef, {threshold: 0.4,});


    React.useEffect(() =>{
        if (intersection?.isIntersecting){
            setActiveCategoryId(categoryId);
        }
    }, [categoryId, intersection?.isIntersecting, title]);

    return (
        <div className={className} id={title} ref={intersectionRef}>
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