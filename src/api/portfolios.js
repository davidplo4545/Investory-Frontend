// import { ContactSupportOutlined } from '@material-ui/icons'
import axios from 'axios'

const domain = "http://127.0.0.1:8000/api"

export const getAllPortfolios = (userToken, setPortfolios) =>{
    axios.get(domain + `/portfolios/me`,{
        headers:{
            'Authorization': `Token ${userToken}`
        }
    })
    .then((res) =>{
        const portfolios = res.data
        const portfolio = {...portfolios[0]}
        const portfolio1 = {...portfolio}
        portfolio1.id = 5
        portfolios.push(portfolio1)
        const portfolio2 = {...portfolio}
        portfolio2.id = 3
        portfolios.push(portfolio2)
        const portfolio3 = {...portfolio}
        portfolio3.id = 4
        portfolios.push(portfolio3)
        setPortfolios(portfolios)
    })
}

export const getPortfolio = async (userToken, portfolioId, setPortfolio) =>{
    await axios.get(domain + `/portfolios/${portfolioId}`,{
        headers:{
            'Authorization': `Token ${userToken}`
        }
    })
    .then((res) =>{
        setPortfolio(res.data)
    })
}

export const postPortfolio = async (userToken, requestData, history) =>{
    await axios.post(domain + `/portfolios/`,
        requestData,
        {headers:{
            'Authorization': `Token ${userToken}`
        }}
    )
    .then((res) =>{
        console.log(res.data)
        history.push({
            pathname: `/portfolios/${res.data.id}`,
        })
        
    })
    .catch(error => console.log(error))
}

export const patchPortfolio = async (userToken,portfolioId, requestData, setPortfolio, history) =>{
    await axios.patch(domain + `/portfolios/${portfolioId}/`,
        requestData,
        {headers:{
            'Authorization': `Token ${userToken}`
        }}
    )
    .then((res) =>{
        setPortfolio(res.data)
        history.push({
            pathname: `/portfolios/${res.data.id}`,
        })
        
    })
    .catch(error => console.log(error, userToken))
}



