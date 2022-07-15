import { ICategory } from "../interfaces";

export const categoriesData: Record<string, ICategory> = {
    animals: {
        name: 'animals',
        page: 1,
    },
    food: {
        name: 'food',
        page: 1,
    },
    nature: {
        name: 'nature',
        page: 1,
    },
    numbers: {
        name: 'numbers',
        page: 1,
    },
    sports: {
        name: 'sports',
        page: 1,
    },
    transport: {
        name: 'transport',
        page: 1,
    },
    superhero: {
        name: 'superhero',
        page: 1,
    },
};

export type categoriesKeys = keyof typeof categoriesData;
