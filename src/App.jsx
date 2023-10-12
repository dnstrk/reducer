import { useReducer } from "react";
import "./App.css";
import { useState } from "react";
import React from "react";
import { Container, Switch } from "@mui/material";
import axios from "axios";
import ShowButton from "./ShowButton";

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
    const [card, setCard] = useState([]);
    const [showList, setShowList] = useState(true);

    function openCard(id) {
        console.log(id);
    }

    return (
        <div className="App">
            <Container>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    {showList ? (
                        <ul>
                            {state.map((user) => (
                                <li key={user.id}>
                                    <ShowButton
                                        listState={showList}
                                        listVisible={setShowList}
                                        cardInfo={card}
                                        cardEdit={setCard}
                                        children={user.name}
                                        cardItem={user}
                                    ></ShowButton>
                                </li>
                            ))}
                        </ul>
                    ) : null}
                    {card.length === 0 ? null : (
                        <div
                            style={{ display: "flex", flexDirection: "column" }}
                        >
                            <button
                                style={{
                                    display: "inline-block",
                                    width: "100px",
                                }}
                                onClick={function () {
                                    setShowList(!showList);
                                    setCard([]);
                                }}
                            >
                                home
                            </button>
                            <div>
                                <b>User:</b> <br />
                                {card.name} - {card.username}
                            </div>
                            <div style={{ marginTop: "5px" }}>
                                <b>Address:</b> <br />
                                {card.address.city} : {card.address.street} :{" "}
                                {card.address.suite}
                            </div>
                            <div style={{ marginTop: "5px" }}><b>Contacts:</b> <br /> number: {card.phone} <br />email: {card.email}</div>
                        </div>
                    )}
                    {/* {showCard ? <div>cardId={card.id}</div> : null} */}
                </div>
            </Container>
        </div>
    );
}

export default App;
