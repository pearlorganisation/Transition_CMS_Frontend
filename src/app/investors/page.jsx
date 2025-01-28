"use client"
import React, { useEffect, useState } from 'react'

const InvestorPage = () => {
const [message, setMessage] = useState('')
useEffect(()=>{
  async function fetchHello() {
    const res = await fetch('/api/investors');

    const data = await res.json();
    console.log("the data ", data)
    setMessage(data);
  }

  fetchHello();
},[])
console.log("the data is0", message)
  return (
    <div>{Array.isArray(message)&& message.map((el)=>(
      <div key={el.id}>
        <h1>{el.name}</h1>
        <h2>{el.price}</h2>
      </div>
    )) || 'Loading...'}</div>
  )
}

export default InvestorPage