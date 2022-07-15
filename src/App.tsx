import React, { useEffect, useState } from 'react';
import './App.css';
import { RowComponent } from './components';
import { IItem } from './interfaces';
import { generateMatrix, randomFromArray, getImages } from './utils';

function App() {
  const [board, setBoard] = useState<IItem[][]>([]);
  const [selectedItems, setSelectedItems] = useState<Record<string, IItem>>({});
  const [foundedItems, setFoundedItems] = useState<string[]>([]);
  const arraySelected = Object.keys(selectedItems);

  const onSelectedItems = (selected: IItem): void => {
    setSelectedItems(curr => ({...curr, [selected.uniqueId || '']: selected}));
  };

  const createBoard = (): void => {
    const categories = ['animals', 'food', 'nature', 'objects', 'sports', 'transport', 'superhero'];
    const randomCategory = randomFromArray(categories);
    getImages(randomCategory, 6).then((images) => {
      setBoard(generateMatrix(6, images));
    });
  };

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    if (arraySelected.length === 2) {
      const values = Object.values(selectedItems);
      if (values[0].id === values[1].id) {
        setTimeout(() => {
          setSelectedItems({});
          setFoundedItems(curr => [...curr, values[0].id]);
        }, 700);
      } else {
        setTimeout(() => {
          setSelectedItems({});
        }, 700);
      }
    }
  }, [arraySelected, selectedItems]);

  return (
    <div className="container-board">
      {
        board.map((items, index) => (
          <RowComponent key={index} items={items} selected={arraySelected} founded={foundedItems} onSelected={onSelectedItems} />
        ))
      }
    </div>
  );
}

export default App;
