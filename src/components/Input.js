import React from 'react'
import AddImage from '../img/addImage.png'

const Input = () => {
  return (
    <div className='input'>
        <input type='text' placeholder='Type a message'/>
        <div className='send'>
            <input style={{display: 'none'}} type="file" id='file'/>
            <label htmlFor='file'>
                <img src={AddImage} />
            </label>
            <button>Send</button>
        </div>
    </div>
  )
}

export default Input