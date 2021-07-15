import axios from 'axios'

const domain = "http://127.0.0.1:8000/api"

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

export const getAsset = (userToken, assetId, setAsset, setPrices, setDates, setIsValid) =>{
    axios.get(domain + `/assets/${assetId}`,{
        headers:{
            'Authorization': `Token ${userToken}`
        }
    })
    .then((res) =>{
        setAsset(res.data)
        let records = res.data.records
        let prices = []
        let dates = []
        records.forEach((record) => {
            prices.push(record.price)
            dates.push(record.date)
        });
        setPrices(prices)
        setDates(dates)
    })
    .catch((error) =>{
        setIsValid(false)
    })
}