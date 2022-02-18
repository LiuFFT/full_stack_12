import React from 'react'

const PersonForm = (prop) => {
    return (
        <div>
            <form>
                <div>
                    name: <input  value={prop.newName} onChange={prop.handleNameChange}/>
                </div>
                <div>
                    phone: <input  value={prop.newNumber} onChange={prop.handlePhoneChange}/>
                </div>
                <div>
                    <button type="submit" onClick={prop.addPerson}>add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm