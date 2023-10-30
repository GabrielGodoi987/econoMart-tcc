import axios from "axios";


export async function updateElement(id, data) {
  axios.post(`http://localhost:3333/edit/${id}/product`, data).then((res) => {
    return res.data.data
  }).catch((error) => {
     return error
  })
}

export async function DeleteElement(id) {
  axios.post(`http://localhost:3333/delete/${id}/product`).then((res) => {
    return res.data;
  }).catch((error) => {
    return error;
  })
}
