import axios from 'axios'

const domain = "http://127.0.0.1:8000/api"

export const getAllPortfolios = (userToken, setPortfolios) =>{
    axios.get(domain + `/portfolios/me`,{
        headers:{
            'Authorization': `Token ${userToken}`
        }
    })
    .then((res) =>{
        setPortfolios(res.data)
        // console.log(res.data)
    })
}

export const getPortfolio = (userToken, portfolioId) =>{
    axios.get(domain + `/portfolios/${portfolioId}`,{
        headers:{
            'Authorization': `Token ${userToken}`
        }
    })
    .then((res) =>{
        console.log(res.data)
    })
}

