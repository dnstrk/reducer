import { useEffect, useReducer } from "react";
import "./App.css";
import { useState } from "react";
import React from "react";
import { Container, Switch } from "@mui/material";
import axios from "axios";

function reducer(state, action) {
    switch (action.type) {
        default:
            return state;
    }
    throw Error("Unknown action: " + action.type);
}

const initialState = await fetchData();

async function fetchData() {
    try {
        const response = await axios.get(
            "https://jsonplaceholder.typicode.com/users"
        );
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [visible, setVisible] = useState(false);

    const show = () => {
        setVisible(!visible);
        console.log(state[0])
    };

    // const test = () => {
    //     console.log(state)
    // };

    return (
        <div className="App">
            <Container>
                <div>
                    <Switch size="small" onChange={show}/>
                    {visible ? (
                        <ul>
                            {state.map((user) => (
                                <li key={user.id}>{user.name}</li>
                            ))}
                        </ul>
                    ) : null}
                </div>
            </Container>
        </div>
    );
}

export default App;
