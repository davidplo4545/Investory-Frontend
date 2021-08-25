export const formatNumber = (number, assetCurrency="USD", isDecimalPoint=true) =>{
    let numberFormatter
    if (isDecimalPoint)
        numberFormatter = new Intl.NumberFormat('en-US',  {style: 'currency', currency: assetCurrency, maximumFractionDigits:2})
    if(number > 10000)
        numberFormatter = new Intl.NumberFormat('en-US',  {style: 'currency', currency: assetCurrency, maximumFractionDigits:0})
    else
        numberFormatter = new Intl.NumberFormat('en-US',  {style: 'currency', currency: assetCurrency, maximumFractionDigits:2})
    return numberFormatter.format(number)
}