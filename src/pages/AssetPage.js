import React, { Component } from 'react'

const AssetPage = ({match}) =>{
    return(
        <h1>Asset {match.params.assetId}</h1>
    )
}

export default AssetPage