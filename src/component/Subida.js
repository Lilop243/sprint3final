import React from 'react'

const Subida = ({imagen}) => {
    console.log(imagen)
  return (
    <div>
        <img src={imagen} alt={imagen}/>
        </div>
  )
}

export default Subida