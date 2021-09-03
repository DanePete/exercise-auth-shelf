import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';

function ShelfPage() {

  const dispatch = useDispatch();
  const shelfItem = useSelector(store => store.shelfReducer);
  const userCount = useSelector(store => store.shelfReducer);
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
    fetchUserCount();
  }, []);

  /**
   * the fetch request called from the use effect
   */
  const fetchShelf = () => {
    dispatch({
      type: 'FETCH_SHELF'
    });
  }

  const fetchUserCount = () => {
    dispatch({
      type: 'FETCH_COUNT'
    })
  }

  console.log('shelfItem', shelfItem);
  console.log('user shelf count', userCount);


  const handleInputChange = (event) => {
    setNewShelfItem({
      ...newShelfItem, [event.target.name]: event.target.value
    })
  }

  const deleteItem = (id) => {
    console.log('Deleting Shelf Item', id)
    axios.delete(`/api/shelf/${id}`)
    .then (response => {
      fetchShelf();
      fetchUserCount();
    })
    .catch ( error => {
      console.error('we got an error when deleting', error);
    })
   
  }


  const onSubmit = (event) => {
    event.preventDefault(event);
    console.log('Adding Shelf Item', newShelfItem);

    axios.post('/api/shelf', newShelfItem)
    .then(response => {
      fetchShelf();
      fetchUserCount();
    })
    .catch(error => {d
      console.error('we got an error when trying to POST', error);
    })
  }

  return (
    <div className="container">
      <h2>Shelf</h2>
      <p>All of the available items can be seen here.</p>
      <div className="tables-container">
        <div className="table-left">
          <table>
            <tbody>
            {shelfItem.map((item) => (
              <tr key={item.id}>
                <td>
                  <img src={item.image_url} />
                  <button onClick={() => deleteItem(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        <div className="table-right">
          <table>
            <tbody>
            {userCount.map((item) => (
              <tr key={item.count}>
                <td>{item.username}</td>
                <td>{item.count}</td>2
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
 
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
