import React, {useEffect, useContext, useState} from 'react'
import { UserContext } from '../context/UserContext'
import { getAllPortfolios } from '../api/portfolios'
import './portfolios.css'
import HoldingsChart from '../components/assets-comps/HoldingsChart'
import { Link } from "react-router-dom";

const PortfoliosPage = () =>{
    const user = useContext(UserContext)
    const [portfolios, setPortfolios] = useState([])
    useEffect(() => {
        getAllPortfolios(user.token, setPortfolios)
    },[])
    
    return (
        <div className="portfolios-page">
            <h1>Portfolios Page</h1>
            <ul className="portfolios">
                {portfolios.map((portfolio) =>{
                    return(
                    <li key={portfolio.id}>
                        <div className="portfolio-card">
                            <div className="card__image">
                                <HoldingsChart portfolio={portfolio} 
                                width={350}
                                height={350}
                                innerRadius={40} 
                                outerRadius={80}
                                cx={175}
                                cy={100}/>
                            </div>
                            <div className="card__overlay">
                                    <Link to={`/portfolios/${portfolio.id}`}>
                                <div className="card__header">
                                    <svg className="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                     
                                    {/* <img className="card__thumb" src="https://i.imgur.com/7D7I6dI.png" alt="" /> */}
                                    <div className="card__header-text">
                                        <h3 className="card__title">{portfolio.name}</h3>
                                        <span className="card__tagline">Lorem ipsum dolor sit amet consectetur</span>            
                                        <span className="card__status">1 hour ago</span>
                                    </div>
                                </div>
                                    </Link>
                                <p className="card__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, blanditiis?</p>
                            </div>
                        </div>
                    </li>
                    ) 
                })

                }
            </ul>
        </div>
    )
}

export default PortfoliosPage