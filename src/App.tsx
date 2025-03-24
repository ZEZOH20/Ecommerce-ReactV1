import './App.css'
import {useState} from "react";

function App() {

    const [counter, setCounter] = useState(0);
    return (
        <>
            <div className="text-3xl font-bold underline">
                <h2>Test Tailwind</h2>
                <button className=" bg-red-600 p-2 rounded-md text-white mx-5"
                        onClick={() => setCounter(prev => ++prev)}>clickME
                </button>
                <span>Result : {counter}</span>
            </div>
        </>
    )
}

export default App
