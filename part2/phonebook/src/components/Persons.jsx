const Persons = ({persons, keyword, deletePerson}) => {
    return (
        <div>
            {persons
                .filter(
                    (person) => person.name.toLowerCase().includes(keyword.toLowerCase())
                )
                .map(
                    (person) => <p key={person.id}> {person.name} {person.number}
                                    <button onClick={() => deletePerson(person.id)}>Delete</button>
                                </p>
                )
            }
        </div>
    )
}

export default Persons
