// import { ContactSupportOutlined } from '@material-ui/icons'
import axios from 'axios'

const domain = "http://127.0.0.1:8000/api"

const calculatePortfolioDetails = (portfolio) =>{
    portfolio.gain = portfolio.total_value - portfolio.total_cost 
    portfolio.return = (portfolio.total_value / portfolio.total_cost - 1) * 100
    let portHoldings = portfolio.holdings
    portHoldings.forEach(holding => {
        const {total_value, total_cost, cost_basis} = holding
        holding.percentage = parseFloat(((total_value / portfolio.total_value)).toFixed(2))
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


export const getPortfolio = async (userToken, portfolioId, setPortfolio) =>{
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

export const postComparedAssetPortfolio = async (userToken, portfolioId, requestData, setComparedAssetPortfolio) =>{
    await axios.post(domain + `/portfolios/${portfolioId}/compare/`,
    requestData,
    {headers:{
        'Authorization': `Token ${userToken}`
    }}
)
.then((res) =>{
    let portfolio = res.data
    calculatePortfolioDetails(portfolio)
    console.log(portfolio)
    setComparedAssetPortfolio(portfolio)
    
})
.catch(error => console.log(error))
}



