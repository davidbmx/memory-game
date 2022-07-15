import * as uuid from 'uuid';
import { IItem } from '../interfaces';

export function randomFromArray<T>(values: T[]): T {
  const random = Math.floor(Math.random() * values.length);
  return values[random];
};

export function getUniqueRandom(array: IItem[], selected: string[]): IItem {
  const itemRandom = randomFromArray(array);
  if (selected.filter(item => item === itemRandom.id).length === 2) {
    return getUniqueRandom(array, selected);
  }
  return itemRandom;
}

export function generateMatrix(n: number, images: string[]): IItem[][] {
  const array: IItem[] = Array.from({ length: n }, (_, index) => ({id: uuid.v4(), image: images[index]}));
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