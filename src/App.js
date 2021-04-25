import './App.css';
import Field from './components/Field';
import { useState } from 'react';


function App() {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [showList, setShowList] = useState(false);
  const authenticationInfo = {user: 'user', password: 'password'};

  const renderPieChart = () => {
    let allQuantity = 0;
    let sumPreviousItems = 0;
    for(let i = 0; i < items.length - 1; i++){
      sumPreviousItems += parseInt(items[i].quantity);
    }
    for(let item of items){
      allQuantity = allQuantity + parseInt(item.quantity);
    }
    let calcPreviousSectionsPercent = (sumPreviousItems, allQuantity) => {
      return (sumPreviousItems / allQuantity) * 100 
    }
    console.log(calcPreviousSectionsPercent(sumPreviousItems, allQuantity))

    return (
      <div className="pie_chart">
        <svg width="100%" height="100%" viewBox="0 0 42 42" class="pie">
          <circle className="pie-hole" cx='21' cy='21' r='15.91549430918952' fill='#fff'></circle>
          <circle className="pie-ring" cx='21' cy='21' r='15.91549430918952' fill='transparent' stroke='#d2d3d4' strokeWidth='5'></circle>
{/* 
          <circle className="pie-segment" cx='21' cy='21' r='15.91549430918952' fill='transparent' stroke='#ce4b99' strokeWidth='3' strokeDasharray='50 50' strokeDashoffset='25'></circle>
          <circle className="pie-segment" cx='21' cy='21' r='15.91549430918952' fill='transparent' stroke='#b1c94e' strokeWidth='3' strokeDasharray='30 70' strokeDashoffset='75'></circle>
          <circle className="pie-segment" cx='21' cy='21' r='15.91549430918952' fill='transparent' stroke='#377bbc' strokeWidth='3' strokeDasharray='20 80' strokeDashoffset='45'></circle> */}

          {items.map((item) => {
            let strokeDasharray = `${(item.quantity / allQuantity) * 100} ${100 - ((item.quantity / allQuantity) * 100)}`;
            // if(item.id !== 0){
            //   return <circle className="pie-segment" cx='21' cy='21' r='15.91549430918952' fill='transparent' stroke={item.color} strokeWidth='5' strokeDasharray={strokeDasharray} strokeDashoffset={calcPreviousSectionsPercent()}>yo</circle>
            // } else {
            //   return <circle className="pie-segment" cx='21' cy='21' r='15.91549430918952' fill='transparent' stroke={item.color} strokeWidth='5' strokeDasharray={strokeDasharray} strokeDashoffset='25'></circle>
            // }
            return <circle className="pie-segment" cx='21' cy='21' r='15.91549430918952' fill='transparent' stroke={item.color} strokeWidth='5' strokeDasharray={strokeDasharray} strokeDashoffset={`${125 - calcPreviousSectionsPercent()}`}>yo</circle>
            
          })}
        </svg>
      </div>
    )
  }

  //функция, которая запускается в дочернюю компоненту и обновляет стейт родительской компоненты
  const updateItems = ({id, name, quantity, deleteId}) => {     //переменная, которая прилетает, обворачивается в объект
      let newItems = items.map((item) => {
        if(item.id === id){
          item.name = name;
          item.quantity = quantity;
        } 
        return item;
      });
      if(id === deleteId){
        newItems = newItems.filter((item) => item.id !== deleteId);
      }
      setItems(newItems);
  }

  const renderFields = () => {
    console.log(items);
    return items.map((item) => {
      return <Field updateItems={updateItems} id={item.id}/>
    })
  };
  
  const addField = () => {
      setItems([...items, {
        id: items.length, 
        name: '', 
        quantity: 0, 
        color: '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6), 
      }])
  } 
  
  const renderFieldComponents = () => {   
    console.log('kkd')
        return (
          <div>
           <div className="field_components">{renderFields()}</div>
               <div className="add_field_container">
                 <button onClick={()=>{
                   addField();
                 }}>ADD ITEM</button>
               </div>
         </div>
        )
}

  const signIn = () => {
      return (
        <div>
          <div className="authorization">
            <form>
              <h2>To use PieChart enter a name and password</h2>
              <label>Name</label>
              <input 
                type="text"
                name="name"
                placeholder="name"
                value={user}
                onChange={(event) => {
                  event.preventDefault();
                  setUser(event.target.value);
                }}
              >
              </input>
              <label>Password</label>
              <input
                type="text"
                name="password"
                placeholder="password"
                value={password}
                onChange={(event) => {
                  event.preventDefault()
                  setPassword(event.target.value);
                }}
              />
            </form>
            <button onClick={() => {
              if(user === authenticationInfo.user && password === authenticationInfo.password){
                setShowList(true)
              };
            }}>SUBMIT</button>
          </div>
        </div>
      )
  }

  const logOut = () => {
    return (
      <div>
        <button onClick={() => {
          setShowList(false);
        }}>LOG OUT</button>
      </div>
    )
  }


  

  return (
      <div className="App">
        <div className="container">
          <h1>React Pie Chart</h1>
          <section className="pie_chart_container">
            {renderPieChart()}
          </section>
          

              
          <section className="sign_in">
            { showList === false ? signIn() : null}
          </section>
          <section className='fields_container'>
                { showList ? renderFieldComponents() : null }
                { showList === true ? logOut() : null }
          </section>
        </div>
      </div>
  );
}

export default App;
