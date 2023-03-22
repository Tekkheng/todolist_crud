import { hasSelectionSupport } from "@testing-library/user-event/dist/utils";
import React, { useState, useEffect, useRef } from "react";

const Todolist = () => {
  const [data, setData] = useState("");
  const [items, setItems] = useState([]);
  const [edit, setEdit] = useState({});
  const [pesanError, setPesanError] = useState("");

  const inputData = (inpt) => {
    setData(inpt);
  };
  // s
  const ToDo = (event) => {
    event.preventDefault();
    if (edit.id) {
      const itemsBaru = {
        data,
        id: generateid(),
      };
      const cariIndex = items.findIndex((i) => {
        return i.id === edit.id;
      });
      console.log(cariIndex);
      const cloneItems = [...items];
      cloneItems[cariIndex] = itemsBaru;
      if (data !== "") {
        setItems(cloneItems);
        setData("");
        setEdit("");
        setPesanError("");
      } else {
        setPesanError("Error, isi data untuk edit dulu! ");
      }
    } else if (items.length < 10) {
      if (data !== "") {
        setPesanError("");
        setItems([...items, { data, id: generateid(), done: false }]);
        setData("");
      } else {
        return setPesanError("Error, Data belum di isi");
      }
    } else {
      alert("Data Kepenuhan");
    }
  };

  const hapusItems = (id) => {
    const filterItems = items.filter((item) => {
      return id != item.id;
    });
    console.log(filterItems);
    setItems(filterItems);
  };

  const generateid = () => {
    return Date.now();
  };

  const editItems = (argumentItems) => {
    setData(argumentItems.data);
    setEdit(argumentItems);
    setPesanError("");
  };

  const Cancel = () => {
    setData("");
    setEdit({});
    setPesanError("");
  };

  const updateCheck = (update) => {
    // console.log(items);
    const updateItems = {
      ...update,
      done: update.done ? false : true,
    };
    // console.log(updateItems);
    const cariIndex = items.findIndex((i) => {
      return i.id == update.id;
    });
    // console.log(cariIndex);
    const cloneItems = [...items];
    cloneItems[cariIndex] = updateItems;

    setItems(cloneItems);
    console.log(items);
    console.log(cloneItems);
  };
  return (
    <>
      <div className="box">
        <h1>To Do List</h1>
        <p style={{ position: "relative", bottom: "10%" }}>
          {" "}
          Data : {items.length}
        </p>
        <div className="inptData">
          <input
            className="inpt1"
            type="text"
            onChange={(inpt) => inputData(inpt.target.value)}
            value={data}
            placeholder="Isi Data ..."
          />
          <h6
            style={{
              position: "absolute",
              top: "-2.5rem",
              color: "tomato",
              textShadow: "none",
            }}
          >
            {pesanError}
          </h6>
          {edit.id ? (
            <button className="btnAdd" type="submit" onClick={ToDo}>
              Edit
            </button>
          ) : (
            <button className="btnAdd" type="submit" onClick={ToDo}>
              Add
            </button>
          )}
          {edit.id && (
            <button className="btnAdd" type="submit" onClick={Cancel}>
              Cancel
            </button>
          )}
        </div>

        {items.length > 0
          ? items.map((item) => {
              return (
                <ol>
                  {item.done && (
                    <li
                      style={{
                        float: "right",
                        position: "absolute",
                        right: "7rem",
                        color: "green",
                      }}
                    >
                      Done
                    </li>
                  )}
                  <li>{item.data}</li>
                  <button
                    className="btn"
                    onClick={hapusItems.bind(this, item.id)}
                  >
                    Hapus
                  </button>
                  <button className="btn2" onClick={editItems.bind(this, item)}>
                    Edit
                  </button>
                  <input
                    className="cekbox"
                    type="checkbox"
                    onChange={updateCheck.bind(this, item)}
                    style={{ float: "right" }}
                    value={items.done}
                  />
                </ol>
              );
            })
          : "ToDo Masih Empty"}
      </div>
    </>
  );
};

export default Todolist;
