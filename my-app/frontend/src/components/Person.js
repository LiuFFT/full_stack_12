import React from 'react'

const Button = ({ onClick, text ,id}) => (
    <button onClick={onClick} data-id={id}>
        {text}
    </button>
)

const Person = ({ name, phone, handleDeletePerson, id}) => {

    // console.log("person:",id)

    return (
        <div className='note'>
            <li>{name}  {phone} <Button text="delete" onClick={handleDeletePerson} id={id}/></li>
        </div>
    )
}

export default Person