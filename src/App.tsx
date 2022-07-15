import React, { useEffect, useState } from 'react';
import './App.css';
import { RowComponent } from './components';
import { ICategory, IItem } from './interfaces';
import { generateMatrix, randomFromArray, getImages } from './utils';
import { categoriesData } from './utils/categoriesData';

function App() {
  const [board, setBoard] = useState<IItem[][]>([]);
  const [selectedItems, setSelectedItems] = useState<Record<string, IItem>>({});
  const [foundedItems, setFoundedItems] = useState<string[]>([]);
  const [currentImages, setCurrentImages] = useState<Record<keyof typeof categoriesData, ICategory>>(categoriesData);
  const arraySelected = Object.keys(selectedItems);

  const onSelectedItems = (selected: IItem): void => {
    setSelectedItems(curr => ({...curr, [selected.uniqueId || '']: selected}));
  };

  const createBoard = (): void => {
    const randomCategory = randomFromArray(Object.values(currentImages));
    getImages(randomCategory, 6).then(({images, nextPage}) => {
      setBoard(generateMatrix(6, images));
      setCurrentImages(im => ({
        ...im,
        [randomCategory.name]: {
          ...im[randomCategory.name],
          page: nextPage ? im[randomCategory.name].page + 1 : 1,
        }
      }));
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

  useEffect(() => {
    if (foundedItems.length === 6) {
      setFoundedItems([]);
      alert('You win!');
      createBoard();
    }
  }, [foundedItems, createBoard]);

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
