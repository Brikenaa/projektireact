import React, { useContext } from 'react';
import { Context } from '../Context/Products';

const Card = () => {
  const [state, dispatch] = useContext(Context);

  const deleteEl = (id) => {
    const newArr = state.basket.filter((e, i) => i !== id);
    const convertToString = JSON.stringify(newArr);
    localStorage.setItem("basket", convertToString);
    dispatch({
      type: "BASKET",
      payland: { basket: newArr }
    });
  }
  const totalPrice = state.basket.reduce((acc, curr) => acc + curr.retailPrice, 0);
  const username=(localStorage.getItem('username') || '');



  return (
      <table className='card-table'>
        <thead>
          <tr>
            <th></th>
            <th>Brand</th>
            <th>Gender</th>
            <th>Size</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {state.basket.map((el, index) => (
            <tr>
              <td><img src={el.media.imageUrl} /></td>
              <td>{el.brand}</td>
              <td>{el.gender}</td>
              <td>{el.selectedSize}</td>
              <td>{el.retailPrice}</td>
              <td><button className="btn" onClick={() => deleteEl(index)}>X</button></td>
            </tr>
          ))}
        </tbody>
        <tfoot>
      <tr>
        <th colSpan="4">Total Price:</th>
        <th>{totalPrice}&#x20AC;</th>
        <th></th>
      </tr>

    </tfoot>
      </table>
  )
}

export default Card