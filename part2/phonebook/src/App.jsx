import { useState, useEffect } from "react";
import peopleService from "./services/people";

/* Components */
import PersonList from "./components/PersonList";
import Form from "./components/Form";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState("success");

  /* When the page loads for the first time, people objects from the JSON server will be added
     to the "persons" array and then rendered in the browser   */
  useEffect(() => {
    peopleService.getAll().then((initialPeople) => {
      setPersons(initialPeople);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    /* Creates a new person object */
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    /* if person already exists the user will be given an option to replace the number with the new one entered */
    const doesPersonAlreadyExist = persons.find((person) => person.name === newName);

    if (doesPersonAlreadyExist) {
      const userConfirm = window.confirm(`"${newName}" is already added to phonebook, replace the old number with a new one?`);

      if (userConfirm) {
        /* Update peron in the JSON database using an PUT request */
        peopleService
          .updatePerson(doesPersonAlreadyExist.id, newPerson)

          .then(() => {
            setNotificationMessage(`Modified ${newName}'s number`);
            setNotificationType("success");
            setTimeout(() => {
              setNotificationMessage(null);
            }, 3000);

            /* Update the persons array so that the correct information will be shown on the page without needing a reload */
            const updatedPersons = persons.map((person) => (person.id === doesPersonAlreadyExist.id ? { ...person, name: newName, number: newNumber } : person));
            setPersons(updatedPersons);
          })
          .catch((error) => {
            setNotificationMessage(`${error.response.status} ${error.response.statusText}`);
            setNotificationType("error");
            setTimeout(() => {
              setNotificationMessage(null);
            }, 3000);
          });
      }
    } else {
      /* Adds the new person object to the JSON database and persons array. */
      peopleService
      .create(newPerson)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNotificationMessage(`Successfully added "${returnedPerson.name}" to the phonebook`);
        setNotificationType("success");

        setTimeout(() => {
          setNotificationMessage(null);
        }, 3000);
      });
    }

    setNewName("");
    setNewNumber("");
  };

  const deletePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      peopleService.deletePerson(person.id);
      setPersons(persons.filter((person) => person.id !== id));
    }
  };

  const handleNameInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    const filterValue = event.target.value.toLowerCase();

    setFilteredPersons(persons.filter((x) => x.name.toLowerCase().includes(filterValue)));
    setFilter(filterValue);
  };

  return (
    <>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={notificationType} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>
      <Form onSubmit={addPerson} newName={newName} newNumber={newNumber} handleNameInputChange={handleNameInputChange} handleNumberInputChange={handleNumberInputChange} />

      <h2>Numbers</h2>
      <div>
        <PersonList deletePerson={deletePerson} persons={persons} filteredPersons={filteredPersons} newFilter={newFilter} />
      </div>
    </>
  );
};

export default App;
