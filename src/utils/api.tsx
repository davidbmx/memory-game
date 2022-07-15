const baseUrlApi = process.env.REACT_APP_API_URL;
const token = process.env.REACT_APP_API_TOKEN;

export const getImages = async (randomCategory: string, numImages: number): Promise<string[]> => {
    return await fetch(
        `${baseUrlApi}/search?query=${randomCategory}&per_page=${numImages}&orientation=square`,
        {
            headers: {
                Authorization: token || '',
            }
        }
    )
    .then(res => res.json())
    .then((data) => data.photos.map((item: any) => item.src.medium));
}