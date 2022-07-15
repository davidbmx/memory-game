import React from 'react';
import { IItem } from '../interfaces';
import { CardComponent } from './card-component';

interface RowComponentProps {
    items: IItem[];
    selected: string[];
    founded: string[];
    onSelected: (selected: IItem) => void;
}

export const RowComponent = ({ items, selected, founded, onSelected }: RowComponentProps): JSX.Element => {

    return (
        <div className='row-container'>
            {
                items.map((item) => (
                    <CardComponent
                        key={item.uniqueId}
                        item={item}
                        selected={selected.includes(item.uniqueId || '')}
                        founded={founded.includes(item.id)}
                        onSelected={() => onSelected(item)}
                    />
                ))
            }
        </div>
    );
};
