import React, { useState } from 'react';
import ReactDOM from "react-dom";

const Counter = () => {
  // Definir el estado del contador usando useState
  const [count, setCount] = useState(0);

  // Función para incrementar el contador
  const incrementCount = () => {
    setCount(count + 1);
  };

  // Función para decrementar el contador
  const decrementCount = () => {
    setCount(count - 1);
  };

  return (
    <div className="text-3xl font-bold underline">
      <h2>Contador: {count}</h2>
      <button onClick={incrementCount}>Incrementar</button>
      <button onClick={decrementCount}>Decrementar</button>
    </div>
  );
};
export default Counter;
