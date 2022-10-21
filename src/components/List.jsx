import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const List = ({ shopping,handleEdit,handleRemove }) => {
  // console.log(shopping);
  return (
    <div>
      {shopping.map((item) => {
        const { title, id } = item;
        return (
          <div key={id}>
            <p>{title}</p>
            <div>
              <button className='edit' type='button' onClick={()=>handleEdit(id)}>
                <FaEdit />
              </button>
              <button className='delete' type='button' onClick={()=>handleRemove(id)}>
                <FaTrashAlt />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default List;
