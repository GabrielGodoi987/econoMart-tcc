import axios from "axios";


export async function updateElement(id, data) {
    try {
        axios.post(`http://localhost:3333/AllProducts/${id}/edit`, data).then((response) => {
            console.log(response.data)
        }).catch((error) => {
            console.log(error);
        })
    } catch (error) {
        console.log(error)
    }
}

export async function DeleteElement(id) {
    try {
        axios.post(`http://localhost:3333/AllProducts/${id}/delete`).then((response) => {
            console.log(response.data)
        }).catch((error) => {
            console.error(error)
        })
    } catch (error) {
        console.log(error)
    }
}