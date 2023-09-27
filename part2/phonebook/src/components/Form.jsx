import Input from "./Input";

const Form = ({ onSubmit, newName, newNumber, handleNameInputChange, handleNumberInputChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <Input value={newName} onChange={handleNameInputChange} />
      </div>
      <div>
        number: <Input value={newNumber} onChange={handleNumberInputChange} />
      </div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default Form;
