import useStore from "./store";
import data from "./data.json";
import { orderConfirmationBackened } from "./orderConfirmationBackened";
import { useEffect, useState } from "react";

function Cart() {
  const { countOfItems, cart, addItemsInCart, removeItemFromCart, clearCart } = useStore();
  const [cartTotalAmt, setCartTotalAmount] = useState(0)
  let placeHolderForTotalCartValue = 0;
  let itemsList = [];

  function addItemCountInCart(e) {
    const itemId = e.target.id;
    addItemsInCart(itemId);
  }

  function removeItemCountInCart(e) {
    const itemId = e.target.id;
    removeItemFromCart(itemId);
  }

  function placeOrder() {
    if (countOfItems > 0) {
      let confirmedCart = {}
      Object.keys(cart).forEach((item) => {
        const [itemCategory, itemID] = item.split("-"); 
        confirmedCart[data[itemCategory][itemID]["name"]] = cart[item]
      })
      const returnValue = orderConfirmationBackened(confirmedCart)
      if (returnValue === 1) {
        clearCart()
      }
    } else {
      alert("No items added to place order")
    }
  }


  if (countOfItems > 0) {
    Object.keys(cart).forEach((item) => {
      const [itemCategory, itemID] = item.split("-");

      const totalPriceOfProduct = data[itemCategory][itemID]["price"] * cart[item]

      placeHolderForTotalCartValue += totalPriceOfProduct;

      itemsList.push(
        <section className="cartItem" key={item}>
          <section className="itemImageHolder" style={{ height: "90%", width: "35%", padding: "2%" }}>
            <img src={data[itemCategory][itemID]["image"]} alt={data[itemCategory][itemID]["name"]}></img>
          </section>
          <section className="itemDetailsHolder">
            <section className="itemNameAndQtyHolder">
              <section>
                <p style={{fontWeight: "bolder"}}>{data[itemCategory][itemID]["name"]}</p>
              </section>
              <section>
                <p>{cart[item] + (cart[item] > 1 ? " units" : " unit")}</p>
              </section>
              <section className="cartEditbuttons">
                <button
                  onClick={removeItemCountInCart}
                  className="editCart"
                  id={item}
                >
                  -
                </button>
                <button
                  onClick={addItemCountInCart}
                  className="editCart"
                  id={item}
                >
                  +
                </button>
              </section>
            </section>
            <section className="itemTotalPriceHolder">
              ₹{totalPriceOfProduct}
            </section>
          </section>
        </section>
      );
    });

  }

  
  useEffect(() => {
    setCartTotalAmount(placeHolderForTotalCartValue)
   })
  
  return (
    <div id="cartPage">
      <section id="listOfItems">
        <section style={{display: "flex", justifyContent: "space-between"}}>
          <h2>Cart total:</h2>
          <h2>₹{cartTotalAmt}</h2>
        </section>
        
        <hr></hr>        
        {countOfItems > 0 ? (
          itemsList
        ) : (
          <h4 style={{ textAlign: "center", paddingTop: "35%" }}>
            Cart is empty at the moment
          </h4>
        )}
      </section>
      <section id="cartOptions">
        <section className="cartOption">
          <button onClick={() => clearCart()}>Clear cart</button>
        </section>
        <section className="cartOption">
          <button onClick={placeOrder}>Place order</button>
        </section>
      </section>
    </div>
  );
}

export default Cart;
