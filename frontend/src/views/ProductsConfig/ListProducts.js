import axios from 'axios';

export async function getApi() {
    try {
        const response = await axios.get('http://localhost:3333/AllProducts');
        return response.data.AllProducts;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        throw error;
    }

}