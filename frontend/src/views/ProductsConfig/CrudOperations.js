import axios from "axios";


export async function updateElement(id, data) {
  axios.post(`http://localhost:3333/edit/${id}/product`, data).then((res) => {
    return res.data.data
  }).catch((error) => {
     return error
  })
}

export async function DeleteElement(id) {
  alert(id)
}