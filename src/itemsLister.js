import { useState} from 'react';
import data from "./data.json"
import useStore from './store';
// import { CartItem } from './App';

function ItemsLister(){
    const {countOfItems, cart, addItemsInCart, removeItemFromCart} = useStore()
    // console.log(countOfItems, cart)
    // itemsType is the list of items to be shown
    const [itemsType, seItemsType] = useState(0)


    function addItemCountInCart(e){
      const itemId = e.target.id; // Get the ID from the target element
      addItemsInCart(itemId); 
      return null
    }

    function removeItemCountInCart(e){
      const itemId = e.target.id; // Get the ID from the target element
      if (cart[itemId] > 0) {
        removeItemFromCart(itemId); 
      }
      return null
    }

    // Dynamically access the correct category based on the state
    const items = data[itemsType === 0 ? "Food" : itemsType === 1 ? "Drinks": "Deserts"];
    const itemsList = items.map((item) => {
      // console.log(item)
      return (
        <section className="item" key={item.id}>
          <img src={item.image} />
          <section className="cartValue">
            <button onClick={removeItemCountInCart} className='editCart' id={item.id}>-</button>
              {cart.hasOwnProperty(item.id) ? cart[item.id] : 0}
            <button onClick={addItemCountInCart} className='editCart' id={item.id}>+</button>
        </section>
          <p key={item.id}>{item.name} : ₹{item.price}</p>
        </section>
      )
    })



    // const itemsList = data[itemsType].map((item: Array) => <p>{item["name"]}</p>)

    return (
        <div id="ItemsListerContainer">
          <section id="foodOptionsHolder">
              <button className={itemsType === 0 ? "activeFoodOption" : "foodOption"} onClick={() => seItemsType(0)}>Food</button>
              <button className={itemsType === 1 ? "activeFoodOption" : "foodOption"} onClick={() => seItemsType(1)}>Drinks</button>
              <button className={itemsType === 2 ? "activeFoodOption" : "foodOption"} onClick={() => seItemsType(2)}>Deserts</button>
          </section>
          <section id="fooditemsHolder">
              {itemsList}
          </section>
        </div>
    );
  }
  
export default ItemsLister;
 