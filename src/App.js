import './App.css';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import { useState } from 'react';

const prd = [
  { id: 1, name: "productA", price: "100원" },
  { id: 2, name: "productB", price: "200원" },
  { id: 3, name: "productC", price: "300원" },
];

function WelCome() {
  return <h2>Welcome Shopping!!</h2>;
}

function Products({ addToCart }) {
  return (
    <ul>
      {prd.map(product => (
        <li key={product.id}>
          {product.name} - {product.price}
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </li>
      ))}
    </ul>
  );
}

function Cart({ cartItems, removeFromCart }) {
  return (
    <>
      
      <ul>
        {cartItems.length === 0 ? (
          <li>장바구니가 비어 있습니다</li>
        ) : (
          cartItems.map(item => (
            <li key={item.id}>
              {item.name} - {item.price}
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))
        )}
      </ul>
    </>
  );
}

function Result({ cartItems }) {
  const total = cartItems.reduce((sum, item) => sum + parseInt(item.price), 0);
  return <h2>결제금액: {total}원</h2>;
}

function Mainlayout() {
  const navigate = useNavigate();
  return (
    <>
      <nav>
        <span>
          <Link to="/products">상품보기</Link>
        </span>
        <span>
          <Link to="/cart">장바구니</Link>
        </span>
        <span>
          <Link to="/result">결제금액보기</Link>
        </span>
      </nav>
      <Outlet />
      <button onClick={() => navigate("/")}>홈으로</button>
    </>
  );
}

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <>
      <h1>Shopping</h1>
      <Routes>
        <Route path="/" element={<Mainlayout />}>
          <Route index element={<WelCome />} />
          <Route path="products" element={<Products addToCart={addToCart} />} />
          <Route path="cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
          <Route path="result" element={<Result cartItems={cartItems} />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;



