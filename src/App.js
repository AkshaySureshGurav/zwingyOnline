import React from 'react';
import ItemsLister from './itemsLister';
import { useState, useEffect } from 'react';
import './App.css';
import Cart from './cart';
import useStore from './store';

function App() {

  useEffect(() => {
    const updateViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    updateViewportHeight(); // Set height on initial load
    window.addEventListener('resize', updateViewportHeight); // Update height on resize

    return () => window.removeEventListener('resize', updateViewportHeight); // Cleanup
  }, []);

  const {countOfItems} = useStore()
  console.log("Count of items in cart - " + countOfItems)
  const [isCartVisible, setIsCartVisible] = useState(false)

  return (
    <div className="App" style={{ height: 'calc(var(--vh, 1vh) * 100)' }}>
      <header className="App-header">
        <section>
          <h1>Zwingy</h1>
          <h6 className='cedarville-cursive-regular'>Fulfill your cravings</h6>
        </section>
        <button onClick={() => setIsCartVisible(!isCartVisible)} id='cartIcon'>
          {
            isCartVisible ?
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg>
            : 
              <>
                {countOfItems > 0 ? <section id='cartCountShower'>{countOfItems}</section> : <></>}
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/></svg> 
              </>
          }
        </button>
      </header>
      <div id='remainingPart'>
        {
          isCartVisible ?
          <Cart/>
          : 
          <ItemsLister/>
        }
      </div>   
    </div>
  );
}

export default App;
