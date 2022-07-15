import React, { useEffect, useState, useMemo } from 'react';
import './App.css';
import * as uuid from 'uuid';
import { RowComponent } from './components';
import { IItem } from './interfaces';

const getUniqueRandom = (array: IItem[], selected: string[]): IItem => {
  const random = Math.floor(Math.random() * array.length);
  if (selected.filter(item => item === array[random].id).length == 2) {
    return getUniqueRandom(array, selected);
  }
  return array[random];
}

const generateArray = (n: number): IItem[][] => {
  const array: IItem[] = Array.from({ length: n }, (_, index) => ({id: uuid.v4(), image: require(`/assets/images/${index + 1}.png`)}));
  const matrix: IItem[][] = [];
  let itemsSelected: string[] = [];
  
  for (let i = 0; i < 3 ; i++) {
    let arrayItems: IItem[] = [];
    for (let z = 0; z < 4; z++) {
      const random = getUniqueRandom(array, itemsSelected);
      arrayItems.push({...random, uniqueId: uuid.v4()});
      itemsSelected.push(random.id);
    }
    matrix.push(arrayItems);
  }

  return matrix;
}

function App() {
  const board = useMemo(() => generateArray(6), []);
  const [selectedItems, setSelectedItems] = useState<Record<string, IItem>>({});
  const [foundedItems, setFoundedItems] = useState<string[]>([]);
  const arraySelected = Object.keys(selectedItems);


  const onSelectedItems = (selected: IItem) => {
    setSelectedItems(curr => ({...curr, [selected.uniqueId || '']: selected}));
  };

  useEffect(() => {
    if (arraySelected.length > 2) {
      setTimeout(() => {
        setSelectedItems({});
      }, 600);
    }

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
  }, [arraySelected]);

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
