import React ,{useEffect, useState}from "react";
import { useSelector } from "react-redux";
import {handleToggle,handleOpen,handleDayDelete,handleDelete,handleAdd,handleEdit} from '../eventhandlers/EventHandler';


function Display({meals}){
    let temp = 0;
    const [arr,setarr] = useState([]);
    const token = useSelector((state) => state.user.token) || window.sessionStorage.getItem('token');
    const id = useSelector((state) => state.user.id) || window.sessionStorage.getItem('id');
    const items = meals.meals;

    useEffect(() =>{
        
        setarr({
            arr: [...items]
        })  
    },[items]);

    const changeState = (props) => {
        setarr({
            arr: [...props]
        });
    }    

    

    return(
       
        <div className='listContainer'>
                {items && items.map(item => {
                    return(
                        <div className='listItem' key={item._id} id={item._id}>
                            <div className={`header ${item.total >= 1000 ? "red" : ""}`} >{item.createdAt}
                            <button className= "arrow" onClick={handleToggle}>-</button>
                            <div className='addArea'>
                            <form className='inputForm' onSubmit={(e)=>handleAdd(e,items,changeState,id,token)} data-date={item.createdAt}>
                                <input type='text' className='name' placeholder='Title' required></input>
                                <input type='number' className='cal' placeholder='Calorie' required min={1}></input>
                                <button className="addButton">Add</button>
                            </form>
                            </div>
                            <div className="deleteDay" onClick={(e)=>handleDayDelete(e,items,changeState,id,token)} data-id={item._id}>Delete Day</div>
                            </div>
                            <div className='info'>
                            {item.items && item.items.map((sin) => {
                                return(
                                    <div key={sin._id || temp++} className='item'>
                                        
                                    <div style={{marginTop:'1rem', fontWeight:'bold',borderBottom:"1px solid black"}}>Title</div>    
                                    <div style={{marginTop:'1rem', fontWeight:'bold'}} >{sin.title}</div>
                                    <div style={{marginTop:'3rem', fontWeight:'bold',borderBottom:"1px solid black"}}>Calories</div>
                                    <div style={{marginTop:'1rem', fontWeight:'bold'}}>{sin.calorie}</div>
                                    <div className='editButton' style={{marginTop:'2rem'}} onClick={handleOpen}>Edit</div>
                                    <div className='addArea'>
                                    <form className='inputForm' onSubmit={(e) => handleEdit(e,items,changeState,id,token)} data-date={item.createdAt} data-mealid={sin.mealId} data-cal={sin.calorie} data-title={sin.title}>
                                        <input type='text' className='name' placeholder='Title'></input>
                                        <input type='number' className='cal' placeholder='Calorie' min={1}></input>
                                        <button className="addButton">Save</button>
                                    </form>
                                    </div>
                                    <div className='deleteButton' onClick={(e)=>handleDelete(e,items,changeState,id,token)} data-date={item.createdAt} data-mealid={sin.mealId} data-cal={sin.calorie} style={{marginTop:'1rem'}}>Delete</div>
                                    </div>
                                )
                            })}
                            </div>
                        </div>
                    )                
                })}
        </div>
        
    )    
}

export default Display