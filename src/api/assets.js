import axios from 'axios'

const domain = "https://investory-backend.herokuapp.com/api"

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

