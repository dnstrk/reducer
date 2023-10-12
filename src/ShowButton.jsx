import { Button } from '@mui/material'
import React from 'react'

export default function ShowButton(props) {

  function paintCard() {
    props.listVisible(!props.listState)
    props.cardEdit(props.cardItem)
    console.log(props.cardInfo.length)
  }  

  return (
    <Button onClick={paintCard} variant="text">{props.children}</Button>
  )
}
