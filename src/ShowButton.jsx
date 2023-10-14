import React from "react";
import { Button } from "@mui/material";

const ShowButton = ({
  listState,
  listVisible,
  cardInfo,
  cardEdit,
  children,
  cardItem
}) => {
  function handleButtonClick() {
    if (listState) {
      listVisible(false);
    } else {
      cardEdit(cardItem);
    }
  }

  return <Button onClick={handleButtonClick}>{children}</Button>;
};

export default ShowButton;
