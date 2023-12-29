import React from 'react'
import { useSelector } from 'react-redux'

const Payment = () => {
    const {user} = useSelector((state)=>state.user)
  return (
    <div>Payment</div>
  )
}

export default Payment