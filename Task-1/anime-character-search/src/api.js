import axios from 'axios';

export const fetchCharacters = async (searchQuery = '', pageNumber = 1) => {
    const response = await axios.get('https://api.jikan.moe/v4/characters', {
        params: {
            page: pageNumber,
            limit: 15,
            q: searchQuery,
            order_by: 'favorites',
            sort: 'desc'
        }
    });
    return response.data;
};
