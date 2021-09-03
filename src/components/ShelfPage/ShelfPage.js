import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';

function ShelfPage() {

  const dispatch = useDispatch();
  const shelfItem = useSelector(store => store.shelfReducer);
  // Set user information to local state
  const [newShelfItem, setNewShelfItem] = useState({
    description: '',
    url: ''
  });

  /**
   * FETCH ON LOAD
   * this use effect calls our api shelf to get data
   */
  useEffect(() => {
    fetchShelf();
  }, []);

  /**
   * the fetch request called from the use effect
   */
  const fetchShelf = () => {
    dispatch({
      type: 'FETCH_SHELF'
    });
  }

  console.log('shelfItem', shelfItem);


  const handleInputChange = (event) => {
    setNewShelfItem({
      ...newShelfItem, [event.target.name]: event.target.value
    })
  }

  const onSubmit = (event) => {
    event.preventDefault(event);
    console.log('Adding Shelf Item', newShelfItem);
    
    dispatch({
      type: "ADD_NEW_ITEM",
      payload: newShelfItem
    })
  }

  return (
    <div className="container">
      <h2>Shelf</h2>
      <p>All of the available items can be seen here.</p>
      <table>
        <tbody>
        {shelfItem.map(item => (
          <tr>
            <td>{item.description}</td>
          </tr>
        ))}
        </tbody>
      </table>

      <form onSubmit={onSubmit}>
          <textarea 
           placeholder="description"
           name="description"
           value={newShelfItem.description}
           onChange={handleInputChange}
          />

          <textarea 
            placeholder="image url"
            name="url"
            value={newShelfItem.url}
            onChange={handleInputChange}
          />
          <button type="submit">Add Item</button>
      </form>

    </div>
  );
}

export default ShelfPage;
