import Input from "./Input";

const Filter = ({ newFilter, handleFilterChange }) => {
  return (
    <>
      filter shown with <Input value={newFilter} onChange={handleFilterChange} />
    </>
  );
};

export default Filter;
