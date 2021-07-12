import axios from 'axios'

const domain = "http://127.0.0.1:8000/api"

export const getAllAssets = (userToken, asset_type, setAssets) =>{
    axios.get(domain + `/assets/?type=${asset_type}`,{
        headers:{
            'Authorization': `Token ${userToken}`
        }
    })
    .then((res) =>{
        console.log(res.data)
    })
}