import React from 'react'
import {Typography } from '@material-ui/core'
import {Skeleton} from '@material-ui/lab'
const LoadingComponent =()=>(
    <Typography component="h5" variant="h5" align="center" color="textPrimary" gutterBottom>
            <Skeleton />
            <Skeleton animation={false} />
            <Skeleton animation="wave" />
        </Typography>
)
export default LoadingComponent