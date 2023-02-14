import React from 'react'
import { useState,useEffect   } from 'react';
import "./style.css"

const getLocalData=()=>{
  const lists=localStorage.getItem("mytodolist")
  if(lists)
  {
    return JSON.parse(lists);
  }
  else{
    return [];
  }
}
const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData())
  
  const [isEditItem, setIsEditItem] = useState("")
  const [toggleButton, settoggleButton] = useState(false)

  const addItem=()=>{

    if(!inputData)
    {
      alert("Plz enter a item")
    }
    else if(inputData && toggleButton)
    {
      setItems(
        items.map((currElem)=>{
           if(currElem.id===isEditItem){
           return{...currElem,name:inputData}
    }
  return currElem})
      )
    setInputData("")
    setIsEditItem(null)
    settoggleButton(false)
    }
    else{
      const myNewData={
        id:new Date().getTime().toString(),
        name:inputData
      }
      setItems([...items,myNewData])
      setInputData("")
    }
  } 


  const deleteItem=(index)=>{
    const updatedItem=items.filter((currElem)=>{
      return currElem.id !== index 
    })
    setItems(updatedItem)
    
  }

  const removeAll=()=>{
    setItems([])
  }

  const editTodo=(index)=>{
    const item_tobeedited=items.find((currElem)=>{
        return currElem.id===index;
    })
    setInputData(item_tobeedited.name)
    setIsEditItem(index)
    settoggleButton(true)
  }


  useEffect(()=>{
    localStorage.setItem("mytodolist",JSON.stringify(items))

  },[items])
  return (
    <>
      <div className="main-div">
        <div className="child-div">
            <figure>
                <img src="./images/todo.svg" alt="todologo" />
                <figcaption>Add Your List here</figcaption>
            </figure>
            <div className="addItems">
                <input type="text" 
                placeholder='✍ Add Item' 
                className='form-control'
                value={inputData}
                onChange={(event)=>{
                    setInputData(event.target.value);

                }}
                />
               {toggleButton ? (
              <i className="far fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
             

            </div>
             <div className="showItems">
              {items.map((currElem,index)=>{
                return<>
                <div className="eachItem">
                    <h3>{currElem.name}</h3>
                    <div className="todo-btn">
                    <i className="far fa-edit add-btn" onClick={()=>{
                      editTodo(currElem.id)
                    }}></i>
                    <i className="far fa-trash-alt add-btn" onClick={()=>{
                      deleteItem(currElem.id)
                    }}></i>
                    </div>
                </div>

                </>

              }
              )}
                

             </div>
            <div className="showItems">
                <button className="btn effect04" onClick={removeAll} data-sm-link-text="Remove All">
                <span>CHECK LIST</span>
                </button>
            </div>
        </div>
      </div>
    </>
  )
}

export default Todo
