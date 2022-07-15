import React from 'react';
import { IItem } from '../interfaces';

interface CardComponentProps { 
    item: IItem;
    selected: boolean;
    founded: boolean;
    onSelected: () => void;
}

export const CardComponent = ({selected, founded, item, onSelected}: CardComponentProps): JSX.Element => {
    return (
        <div className='row-wrapper'>
            <div
                onClick={() => {
                    if (founded) {
                        return;
                    }
                    onSelected();
                }}
                className='row'
                style={{
                    backgroundImage: selected ? `url(${item.image})` : undefined,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: founded ? '#fff' : '#eee',
                    cursor: founded ? 'default' : 'pointer',
                }}
            ></div>
        </div>
    );
};
