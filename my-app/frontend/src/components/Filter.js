import React from 'react'

const Filter = (prop) => {
    return (
        <div>
            filter shown with <input  value={prop.value} onChange={prop.handleFilterChange}/>
        </div>
    )
}

export default Filter