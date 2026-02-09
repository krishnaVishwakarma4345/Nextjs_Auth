import React from 'react'

async function page2({params}) {
  const {id} = await params;
  return (
    <div>page <span>{id}</span></div>
  )
}

export default page2