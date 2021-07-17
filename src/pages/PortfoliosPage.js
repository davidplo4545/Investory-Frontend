import React, {useEffect, useContext, useState} from 'react'
import { UserContext } from '../context/UserContext'
import { getAllPortfolios } from '../api/portfolios'
import './portfolios.css'
import HoldingsChart from '../components/assets-comps/HoldingsChart'

const PortfoliosPage = () =>{
    const user = useContext(UserContext)
    const [portfolios, setPortfolios] = useState([])
    useEffect(() => {
        // setPortfolios([{name:'Growth Portfolio'},
        //                 {name:'Value Portfolio'},
        //                 {name:'Dividend Portfolio'},
        //                 {name:'Crypto Portfolio'},
        //                 {name:'Crypto Portfolio'}])
        getAllPortfolios(user.token, setPortfolios)
        console.log(portfolios)
    },[])
    
    return (
        <div className="portfolios-page">
            <h1>Portfolios Page</h1>
            <ul className="portfolios">
                {portfolios.map((portfolio) =>{
                    return(
                    <li key={portfolio.id}>
                        <a href="true" className="portfolio-card">
                        {/* <img src="https://i.imgur.com/oYiTqum.jpg" className="card__image" alt="" /> */}
                        <div className="card__image">
                            <HoldingsChart portfolio={portfolio}/>
                        </div>
                        <div className="card__overlay">
                            <div className="card__header">
                            <svg className="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                     
                            <img className="card__thumb" src="https://i.imgur.com/7D7I6dI.png" alt="" />
                            <div className="card__header-text">
                                <h3 className="card__title">Jessica Parker</h3>
                                <span className="card__tagline">Lorem ipsum dolor sit amet consectetur</span>            
                                <span className="card__status">1 hour ago</span>
                            </div>
                            </div>
                            <p className="card__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, blanditiis?</p>
                        </div>
                        </a>
                    </li>
                    ) 
                })

                }
            </ul>
        </div>
    )
}

export default PortfoliosPage