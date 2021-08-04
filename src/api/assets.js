import axios from 'axios'

const domain = "http://localhost:8000/api"

export const getAllAssets = (userToken, assetType, setAssets) =>{
    axios.get(domain + `/assets/?type=${assetType}`,{
        headers:{
            'Authorization': `Token ${userToken}`
        }
    })
    .then((res) =>{
        setAssets(res.data)
    })
}

export const getAllAssets1 = (userToken, assetType, setAssets) =>{
    axios.get(domain + `/assets`,{
        headers:{
            'Authorization': `Token ${userToken}`
        }
    })
    .then((res) =>{
        setAssets(res.data)
    })
}

