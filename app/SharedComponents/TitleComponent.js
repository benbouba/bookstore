import React from "react"
import { Typography, Container } from '@material-ui/core'
/**
 * Skeleton component for title
 * @param {*} props
 */
export default function (props) {
  return (
    <Container maxWidth="sm">
      <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
        {props.title}
      </Typography>
      {props.children}
    </Container>
  )
}
