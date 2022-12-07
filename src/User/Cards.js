import { Card } from '@mui/material'
import React from 'react'

const Cards = (img1,img2,img3) => {
  return (
    <div className="container-fluid d-flex justify-content-center">
        <div className="row">
            <div className='col-md-4'>
                <Card img={img1}/>
            </div>
        </div>
        <div className='col-md-4'>
                <Card img={img2}/>
        </div>
        <div className='col-md-4'>
                <Card img={img3}/>
        </div>
    </div>
  )
}

export default Cards