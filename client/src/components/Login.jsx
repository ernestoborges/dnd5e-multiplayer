import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function Login(){

    const navigate = useNavigate();
    const [userName, setUserName] = useState("");

    function handleLogin(e) {
        e.preventDefault();
        localStorage.setItem("userName", userName);
        navigate("/main");
    }

    return <form onSubmit={handleLogin}>
        <label>
            Guest name
            <input type="text" value={userName} onChange={(e)=>{setUserName(e.target.value)}} />
        </label>
        <button>Enter</button>
    </form>
}