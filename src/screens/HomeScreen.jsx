import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'

const HomeScreen = () => {
    const navigate = useNavigate()
    const userInputRef = useRef()

    const handleClick = () => {
        let checkInput = +userInputRef.current.value

        if (Number.isFinite(checkInput)) {
            console.log('number')
            navigate(`/details/${checkInput}`)
        } else {
            console.log('not a number')
        }
    }

  return (
    <div className='col-container'>
        <h1>Home</h1>
        <input type="text" ref={userInputRef} />
        <button onClick={handleClick}>Leave</button>
    </div>
  )
}

export default HomeScreen