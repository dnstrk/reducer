import React, { useReducer, useEffect } from "react";
// import "./App.css";
import { Container } from "@mui/material";
import axios from "axios";
import ShowButton from "./ShowButton";

const initialState = {
  users: [],
  card: null,
  showList: true,
  loading: true,
  error: null
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case "FETCH_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case "SHOW_CARD":
      return {
        ...state,
        card: action.payload,
        showList: false
      };
    case "HIDE_CARD":
      return {
        ...state,
        card: null,
        showList: true
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

async function fetchData(dispatch) {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    dispatch({ type: "FETCH_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "FETCH_ERROR", payload: error });
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchData(dispatch);
  }, []);

  function openCard(card) {
    dispatch({ type: "SHOW_CARD", payload: card });
  }

  function handleHomeButtonClick() {
    dispatch({ type: "HIDE_CARD" });
  }

  return (
    <div className="App">
      <Container>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          {state.showList ? (
            <ul>
              {state.users.map((user) => (
                <li key={user.id}>
                  <ShowButton
                    listState={state.showList}
                    listVisible={(visible) => {
                      if (visible) {
                        handleHomeButtonClick();
                      } else {
                        openCard(user);
                      }
                    }}
                    cardInfo={state.card}
                    children={user.name}
                    cardItem={user}
                  />
                </li>
              ))}
            </ul>
          ) : null}
          {state.card ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <button
                style={{ display: "inline-block", width: "100px" }}
                onClick={handleHomeButtonClick}
              >
                home
              </button>
              <div>
                <b>User:</b> <br />
                {state.card.name} - {state.card.username}
              </div>
              <div style={{ marginTop: "5px" }}>
                <b>Address:</b> <br />
                {state.card.address.city} : {state.card.address.street} :{" "}
                {state.card.address.suite}
              </div>
              <div style={{ marginTop: "5px" }}>
                <b>Contacts:</b> <br />
                number: {state.card.phone} <br />
                email: {state.card.email}
              </div>
            </div>
          ) : null}
        </div>
      </Container>
    </div>
  );
}

export default App;
