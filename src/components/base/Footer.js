import React from 'react'
import { Container, Grid,Box, Link, IconButton } from '@material-ui/core'
const Footer = ({isTheme, setIsTheme}) =>{
    return(
        <footer>
            <Box bgcolor="primary.light" color="common.black" style={{marginTop:'2rem', width:'100%'}}>
                <Container maxWidth="lg" >
                    <Grid container spacing={5} color="textPrimary">
                        <Grid item xs={12} sm={4} >
                            <Box borderBottom={1}>Help</Box>
                        
                        </Grid>
                        {/* <Grid item xs={12} sm={4}>
                            <Box borderBottom={1}>Help</Box>
                            <Box>
                                <Link href="/" >
                                    Contact
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box borderBottom={1}>Help</Box>
                            <Box>
                                <Link href="/">
                                    Contact
                                </Link>
                            </Box>
                        </Grid> */}
                    </Grid>
                </Container>
            </Box>
        </footer>
    )
}

export default Footer