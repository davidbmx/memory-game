import { ICategory } from "../interfaces";

const baseUrlApi = process.env.REACT_APP_API_URL;
const token = process.env.REACT_APP_API_TOKEN;

export const getImages = async (randomCategory: ICategory, numImages: number): Promise<{images: string[], nextPage: boolean}> => {
    return await fetch(
        `${baseUrlApi}/search?query=${randomCategory.name}&per_page=${numImages}&orientation=portrait&page=${randomCategory.page}`,
        {
            headers: {
                Authorization: token || '',
            }
        }
    )
    .then(res => res.json())
    .then((data) => ({ images: data.photos.map((item: any) => item.src.medium), nextPage: !!data?.next_page }));
}