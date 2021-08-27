// import { ContactSupportOutlined } from '@material-ui/icons'
import axios from 'axios'
import { useHistory, Redirect } from 'react-router'

const domain = "http://localhost:8000/api"



const calculatePortfolioDetails = (portfolio) =>{
    portfolio.gain = portfolio.total_value - portfolio.total_cost 
    portfolio.return = (portfolio.total_value / portfolio.total_cost - 1) * 100
    portfolio.total_gain = portfolio.gain + portfolio.realized_gain
    let portHoldings = portfolio.holdings
    portHoldings.forEach(holding => {
        const {total_value, total_cost, cost_basis} = holding
        holding.percentage = parseFloat(((total_value / portfolio.total_value) * 100).toFixed(2))
        holding.fill = `${Math.floor(Math.random()*16777215).toString(16)}#`
        holding.gain = parseFloat((total_value - total_cost).toFixed(2))
        holding.gainPercentage = parseFloat(((total_value / total_cost - 1) * 100).toFixed(2))
        holding.total_cost = parseFloat(total_cost.toFixed(2))
        holding.total_value = parseFloat(total_value.toFixed(2))
        holding.cost_basis = parseFloat(cost_basis.toFixed(2))
        holding.asset.last_price = holding.asset.last_price.toFixed(2)
        })
    return portfolio
}
export const getAllPortfolios = (userToken, setPortfolios) =>{
    axios.get(domain + `/portfolios/me`,{
        headers:{
            'Authorization': `Token ${userToken}`
        }
    })
    .then((res) =>{
        const portfolios = res.data
        portfolios.forEach((portfolio) =>{
            calculatePortfolioDetails(portfolio)
        })
        setPortfolios(portfolios)
    })
}


export const getPortfolio = async (userToken, portfolioId, setPortfolio, history) =>{
    await axios.get(domain + `/portfolios/${portfolioId}`,{
        headers:{
            'Authorization': `Token ${userToken}`
        }
    })
    .then((res) =>{
        let portfolio = res.data
        calculatePortfolioDetails(portfolio)
        setPortfolio(portfolio)
    })
    .catch((error) =>{
        history.push({
            pathname: `/404`,
        })
    })
}

export const getSharedPortfolio = async (shortUrl, setPortfolio, history) =>{
    await axios.get(domain + `/${shortUrl}`,{})
    .then((res) =>{
        let portfolio = res.data
        calculatePortfolioDetails(portfolio)
        setPortfolio(portfolio)
    })
    .catch((error) =>{
        history.push({
            pathname: `/404`,
        })
    })
}


export const postPortfolio = async (userToken, requestData, history, setIsLoading, setErrors) =>{
    setIsLoading(true)
    await axios.post(domain + `/portfolios/`,
        requestData,
        {headers:{
            'Authorization': `Token ${userToken}`
        }}
    )
    .then((res) =>{
        setIsLoading(false)
        history.push({
            pathname: `/portfolios/${res.data.id}`,
        })
        
    })
    .catch(error => setErrors([error]))
}

export const patchPortfolio = async (userToken,portfolioId, requestData, setPortfolio, history, setIsLoading, setErrors) =>{
    setIsLoading(true)
    await axios.patch(domain + `/portfolios/${portfolioId}/`,
        requestData,
        {headers:{
            'Authorization': `Token ${userToken}`
        }}
    )
    .then((res) =>{
        let portfolio = res.data
        calculatePortfolioDetails(portfolio)
        setPortfolio(portfolio)
        setIsLoading(false)
        history.push({
            pathname: `/portfolios/${res.data.id}`,
        })
        
    })
    .catch((error) => {
        if(error.response.status === 400)
            setErrors([error.response.data.message])
        setIsLoading(false)
    })
}

export const patchPortfolioIsShare = async (userToken,
    portfolioId, 
    requestData, 
    portfolio,
    setPortfolio) =>{
    await axios.patch(domain + `/portfolios/${portfolioId}/`,
        requestData,
        {headers:{
            'Authorization': `Token ${userToken}`
        }}
    )
    .then((res) =>{
        const tempPortfolio = {...portfolio}
        tempPortfolio.is_shared = res.data.is_shared
        setPortfolio(tempPortfolio)
        
    })
    .catch((error) => {
        console.log(error)
    })
}

export const postComparedAssetPortfolio = async (userToken, portfolioId, requestData,setComparedAsset, setComparedAssetPortfolio, setIsLoading, setError) =>{
    setIsLoading(true)
    await axios.post(domain + `/portfolios/${portfolioId}/compare/`,
    requestData,
    {headers:{
        'Authorization': `Token ${userToken}`
    }}
)
.then((res) =>{
    let portfolio = res.data
    calculatePortfolioDetails(portfolio)
    setComparedAssetPortfolio(portfolio)
    setComparedAsset(portfolio.holdings[0].asset)
    setIsLoading(false)
})
.catch(error => {
    setError("Error: Could not compare the portfolio with this asset!")
    setIsLoading(false)
})
}

export const deletePortfolio = async (userToken, portfolioId, portfolios, setPortfolios) =>{
    await axios.delete(domain + `/portfolios/${portfolioId}`,
    {headers:{
        'Authorization': `Token ${userToken}`
    }}
)
.then((res) =>{
    const portfoliosTemp = [...portfolios].filter(p => p.id !== portfolioId)
    setPortfolios(portfoliosTemp)
})
.catch(error => console.log(error))
}





