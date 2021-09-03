import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';

function ShelfPage() {

  const dispatch = useDispatch();
  const shelfItem = useSelector(store => store.shelfReducer);

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
    </div>
  );
}

export default ShelfPage;
