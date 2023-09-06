import React from 'react'

const Search = () => {
  return (
    <div className='search'>
        <div className='searchForm'>
            <input type="text" placeholder='Find user'/>
        </div>

        <div className='userChat'>
            <img src="https://imgv3.fotor.com/images/cover-photo-image/a-beautiful-girl-with-gray-hair-and-lucxy-neckless-generated-by-Fotor-AI.jpg" />
            <div className='userChatInfo'>
                <span>Display Name</span>
            </div>
        </div>
    </div>
  )
}

export default Search