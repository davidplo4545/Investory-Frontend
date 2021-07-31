import React from 'react'
import RecentlyViewedAssetsBox from './RecentlyViewedAssetsBox'
import InvestmentCalculator from './InvestmentCalculator'
import { Box } from '@material-ui/core'
const RightSidebarData = ({isSingleAsset, asset}) =>{
    return(
        <Box style={{height: "100%", paddingLeft: '25px'}}>
            {/* Only show investment calculator in /assets/id url */}
            {isSingleAsset &&
                <Box xl={12} className="investment-calculator">
                    {asset.records.length > 0 ?
                        <InvestmentCalculator records={asset.records}/>
                            : 
                            <div/>
                    }
                </Box>
            }
            <Box xl={12}>
                <RecentlyViewedAssetsBox asset={asset}/>
            </Box>
            <Box xl={12} className="portfolios-in">
                <h4>Portfolios in:</h4>
                <p>Growth Portfolio</p>
                <p>Value Portfolio</p>
                <p>Cryptos</p>
            </Box>
        </Box>
    )
}

export default RightSidebarData