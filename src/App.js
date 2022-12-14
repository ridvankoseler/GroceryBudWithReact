import { useEffect, useRef, useState } from "react";
import "./App.css";
import List from "./components/List";

const getLocalStorage = () => {
  let list = localStorage.getItem("shopping");
  if (list) {
    return JSON.parse(localStorage.getItem("shopping"));
  } else {
    return [];
  }
};

function App() {
  const refContainer = useRef(null);
  const [shopping, setShopping] = useState(getLocalStorage());
  const [msg, setMsg] = useState({ message: "", bcg: false });
  const [isEditting, setIsEditting] = useState(false)
  const [editID, setEditID] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: new Date().getTime(),
      title: refContainer.current.value,
    };
    if(!newItem.title){
      alert("Please fill in the blanks")
    }else if(newItem.title && isEditting){
      setShopping(
        shopping.map((item)=>{
          if(item.id===editID){
            return{...item,title:refContainer.current.value}
          }
          return item
        })
      )
      setIsEditting(false)
      setMsg({message:"Item Editted" , bcg:true})
    }
    else{
      setShopping([newItem,...shopping])
      setMsg({message:"New Item Added" , bcg:true})
    }
    refContainer.current.value=""
    setIsEditting(false)
  };

   const handleClear = (id) => {
     setShopping([]);
     setMsg({ message: "Item Removed", bcg: true });
   };
  const handleRemove = (id) => {
    setShopping(shopping.filter((item)=>item.id!==id ))
    setMsg({message:"Item Removed" , bcg:true})
  }
  const handleEdit = (id) => {
    const oldItem=shopping.find((item)=>item.id===id)
    refContainer.current.value=oldItem.title
    setIsEditting(true)
    const newList= shopping.toString().replace()
    setEditID(oldItem.id)
    setMsg({ message: "Please New List Item Enter", bcg: true });
  }

  useEffect(() => {
    localStorage.setItem("shopping", JSON.stringify(shopping));
  }, [shopping]);
console.log(shopping);
  return (
    <div className='App'>
      <div className='text-center'>
        <p>{msg.message}</p>
        <form action='' onSubmit={handleSubmit}>
          <label htmlFor=''>Shopping List</label>
          <input
            id='grocery'
            name='grocery'
            type='text'
            placeholder='e.g. eggs'
            ref={refContainer}
          />
          <button type='submit'>Submit</button>
        </form>
        {shopping.length > 0 && (
          <main>
            <List shopping={shopping} handleEdit={handleEdit} handleRemove={handleRemove} />
            <div>
              <button className="clearBtn" onClick={handleClear}>Clear All</button>
            </div>
          </main>
        )}
      </div>
    </div>
  );
}

export default App;
