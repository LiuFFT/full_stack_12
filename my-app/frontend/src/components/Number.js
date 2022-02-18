import Person from "./Person";
import React from "react";

const Number = (prop) => {
    return (
        <div>
            <ul>
                {prop.filterPerson.map(person =>
                    <Person key={person.id} id={person.id} name={person.name} phone={person.number} handleDeletePerson={prop.handleDeletePerson}/>
                )}
            </ul>
        </div>
    )
}

export default Number