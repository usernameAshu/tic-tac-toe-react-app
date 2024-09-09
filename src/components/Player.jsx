import { useState } from "react";

export default function Player({ initName, symbol, isActive, onNameChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initName);

  function handleEditClick() {
    setIsEditing(isEditing => !isEditing);

    if(isEditing) {
      onNameChange(symbol, playerName);
    }
  }

  function handleNameChange(event) {
    // console.log(event.target.value);
    setPlayerName(event.target.value);
  }

  let editablePlayerName = isEditing ? (
    <input type="text" required value={playerName} onChange={handleNameChange} />
  ) : (
    <span className="player-name">{playerName}</span>
  );

  let btnCaption = isEditing ? "Save" : "Edit";

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{btnCaption}</button>
    </li>
  );
}
