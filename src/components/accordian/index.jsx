import { useState } from "react";
import data from "./data";
import "./styles.css";

export default function Accordian() {
  const [selected, setSelected] = useState(null);
  const [enableMulti, setEnableMulti] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSingleSelection(currentId) {
    setSelected(currentId === selected ? null : currentId);
  }

  function handleMultiSelection(currentId) {
    let cpyMulti = [...multiple];
    const findIndexOfId = cpyMulti.indexOf(currentId);
    if (findIndexOfId === -1) {
      cpyMulti.push(currentId);
    } else cpyMulti.splice(findIndexOfId, 1);
    setMultiple(cpyMulti);
  }

  console.log(selected);
  return (
    <div className="wrapper">
      <button onClick={() => setEnableMulti(!enableMulti)}>
        Enable Multi Selection
      </button>
      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((item) => {
            return (
              <div className="item">
                <div
                  onClick={
                    enableMulti
                      ? () => handleMultiSelection(item.id)
                      : () => handleSingleSelection(item.id)
                  }
                  className="title"
                >
                  <h3>{item.question}</h3>
                  <span>+</span>
                </div>
                {enableMulti
                  ? multiple.indexOf(item.id) !== -1 && (
                      <div className="content">{item.answer}</div>
                    )
                  : selected === item.id && (
                      <div className="content">{item.answer}</div>
                    )}
              </div>
            );
          })
        ) : (
          <div>Data not found</div>
        )}
      </div>
    </div>
  );
}
