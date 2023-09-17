import { Grid, GridItem } from '@chakra-ui/react'
import React from 'react'

function Home() {
    return <Grid templateColumns='repeat(10, 1fr)' height='100vh' >
        <GridItem colSpan='3' borderRight='1px solid gray'></GridItem>
        <GridItem colSpan='7'></GridItem>
    </Grid>
}

export default Home