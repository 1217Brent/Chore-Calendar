import React from "react";
import ChoreEntryProps from "../backend/models/ChoreEntry";
import ChoreList from "./choreList";

const ChoreEntry: React.FC<ChoreEntryProps> = ({ choreCollection }) => {

  return (
          <ChoreList choreCollection = {choreCollection}/>
  );
};

export default ChoreEntry;