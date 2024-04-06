import React from 'react'
import * as ReactDOM from "react-dom";

const Counter = () => {
  return (
    <div>Counter</div>
  )
}

document.addEventListener("DOMContentLoaded",() => {
    ReactDOM.render(<Counter/>, document.getElementsByClassName("counter"))
})


export default Counter