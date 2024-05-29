import React, { useState, useEffect} from 'react'
import { Link } from'react-router-dom'
import './NewCollections.css'

import Item from '../Item/Item.js'

const NewCollections = () => {
const [new_collection,setNew_collection] = useState([])

useEffect(() => {
    fetch('https://servicebox35.pp.ru/newcollections')
    .then((response)=>response.json())
    .then((data)=>setNew_collection(data));
    
},[])

  return (
      <div  className='newcollections-main'>
        <h1 className='newcollections-text'>Новое поступление</h1>
           <hr />
      <div className="newcollections">

          <div className="collections">
              {new_collection.map((item, i) => {
                  return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
              })}
          </div>
      </div>
        <div className="back__btn"> 
      <ul>
      <li><Link to="/">На главную</Link>
      </li>
      </ul>
      </div>
        </div>
  );
}

export default NewCollections
