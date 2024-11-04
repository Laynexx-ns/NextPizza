'use client';

import {useClickAway, useDebounce} from "react-use";
import {cn} from "@/lib/utils";
import React, {useRef} from 'react';
import {Search} from "lucide-react";
import Link from "next/link";
import {Api} from "@/services/api-client";
import {Product} from "@prisma/client";

interface Props {
    className?: string;
}

export const SearchInput: React.FC<Props> = ({className}) => {
    const [focused, setFocused] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [products, setProducts] = React.useState<Product[]>([]);



    // отключение темной области при click outside
    const ref = useRef(null);
    useClickAway(ref, () => {
        setFocused(false)
    })

    useDebounce(()=>{
        Api.products.search(searchQuery).then(items => setProducts(items))
    }, 100, [searchQuery]);


    const onClickItem = () =>{
        setSearchQuery('');
        setProducts([]);
    }


    return (
        <>
            {focused && <div className={'fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30'}/>}


            <div className={cn(className, 'flex rounded-2xl flex-1 justify-between relative h-11 z-30')}>
                <Search className={'absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400'}/>
                <input className={'rounded-2xl outline-none w-full bg-gray-100 pl-11'}
                       ref={ref}
                       type={'text'}
                       placeholder={'Найти пиццу'}
                       onFocus={() => setFocused(true)}
                       value={searchQuery}
                       onChange={(e) => setSearchQuery(e.target.value)}

                />
                {products.length > 0 &&
                    <div
                        className={cn(className, ' absolute w-full bg-white rounded-2xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
                            focused && 'visible opacity-100 top-12 bg-gray-100 '
                        )}>

                        {products.map((product) => (
                            <Link href={`/product/${product.id}`}
                                  key={product.id}>
                                <div className={'px-3 py-2 hover:bg-primary/10 flex items-center gap-3 '}>
                                    <img
                                        src={product.imageUrl}
                                        width={32} height={32}
                                        className={'rounded-sm'}
                                        alt={'product.name'}
                                    />
                                    {product.name}
                                </div>
                            </Link>
                        ))}


                    </div>
                }

            </div>
        </>
    )
}