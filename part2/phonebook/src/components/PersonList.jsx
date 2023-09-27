const PersonList = ({ deletePerson, persons, filteredPersons, newFilter }) => {
  if (persons.length === 0) {
    return <p>There are no persons to display.</p>;
  } else if (filteredPersons.length !== 0) {
    return filteredPersons.map((person) => <Person key={person.id} person={person} deletePerson={deletePerson} />);
  } else if (newFilter.length !== 0) {
    return <p>There are no names with the current filter.</p>;
  } else {
    return persons.map((person) => <Person key={person.id} person={person} deletePerson={deletePerson} />);
  }
};

const Person = ({ person, deletePerson }) => {
  return (
    <p>
      {person.name} - {person.number}{" "}
      <button type="button" onClick={() => deletePerson(person.id)}>
        delete
      </button>
    </p>
  );
};

export default PersonList;
