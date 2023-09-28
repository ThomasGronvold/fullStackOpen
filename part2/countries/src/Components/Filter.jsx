import Input from "./Input";

const Filter = ({ newFilter, handleFilterChange }) => {
  return (
    <>
      find countries <Input value={newFilter} onChange={handleFilterChange} />
    </>
  );
};

export default Filter;
