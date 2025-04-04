import { useDispatch } from "react-redux";

const Filter = () => {
  const dispatch = useDispatch();
  
  const handleChange = (event) => {
    const filterValue = event.target.value;

    dispatch({
      type: 'SET_FILTER',
      payload: filterValue
    })
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter