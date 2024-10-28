'use client';
import React from 'react';
import {FilterCheckbox, FilterCheckboxProps} from "@/components/shared/filter-checkbox";
import {Input} from "@/components/ui";


type Item = FilterCheckboxProps;

interface Props {
    title: string;
    items: Item[];
    defaultItems?: Item[]
    limit?: number;
    searchInputPlaceHolder?: string;
    onChange?: (values: string[])=>void;
    defaultValue?: string[];
    className?: string;
}

export const CheckBoxFiltersGroup: React.FC<Props> = (
    {
        title,
        items,
        defaultItems,
        limit,
        searchInputPlaceHolder = 'Поиск...',
        onChange,
        defaultValue,
        className,
    }) => {
    return (
        <div className={className}>
            <p className={'font-bold mb-3'}> {title} </p>

            <div className={'mb-5'}>
                <Input placeholder={searchInputPlaceHolder} className={'bg-gray-50 border-none'}/>
            </div>

            <div className={'flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'}>
                {items.map((item, index) =>(
                    <FilterCheckbox key={index}
                                    text={item.text}
                                    value={item.value}
                                    endAdornment={item.endAdornment}
                                    checked={false}
                                    onCheckedChange={(value) => console.log(value)}
                    />
                ))}
            </div>

        </div>
    )
};