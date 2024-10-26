import React from 'react';

export interface FilterCheckboxProps{
    text: string;
    value: string;
    endAdornment: React.ReactNode;
    onCheckedChange?: (checked: boolean) => void;
    checked?: boolean;
}

