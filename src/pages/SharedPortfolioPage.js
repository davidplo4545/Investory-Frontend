import React from 'react'
import PortfolioPage from './PortfolioPage'


const SharedPortfolioPage = ({match}) =>{
    const shortUrl = match.params.shortUrl

    return(
        <PortfolioPage shortUrl={shortUrl}/>
    )
}

export default SharedPortfolioPage