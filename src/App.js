import './App.css';
import Field from './components/Field';
import { useEffect, useState } from 'react';


function App() {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [showList, setShowList] = useState(false);
  const authenticationInfo = {user: 'user', password: 'password'};

  const allQuantity = items.reduce((a, b) => a + +b.quantity, 0); //0 - дефолтное значение
  let sumPreviousItems = 0;
  let previousPercent = 0;


  

  const renderPieChart = () => {
    return (
      <div className="pie_chart">
        <svg width="100%" height="100%" viewBox="0 0 42 42" class="pie">
          <circle className="pie-hole" cx='21' cy='21' r='15.91549430918952' fill='#F4F1DE'></circle>
          <circle className="pie-ring" cx='21' cy='21' r='15.91549430918952' fill='transparent' stroke='#E07A5F' strokeWidth='5'></circle>
          {items.map((item, index) => {
            sumPreviousItems += parseInt(item.quantity);  
            const dasharray = `${(+item.quantity / allQuantity) * 100} ${100 - (+item.quantity / allQuantity) * 100}`;
            const dashoffset = `${100 - previousPercent + 25}` 
            previousPercent += (+item.quantity / allQuantity) * 100
            console.log(previousPercent + ' percent');
            console.log(dashoffset + ' dashofset');
            return <circle className="pie-segment" cx='21' cy='21' r='15.91549430918952' fill='transparent' stroke={item.color} strokeWidth='5' strokeDasharray={dasharray} strokeDashoffset={index === 0 ? '25' : dashoffset}></circle> 
          })}
        </svg>
      </div>
    )
  }

  //функция, которая запускается в дочернюю компоненту и обновляет стейт родительской компоненты
  const updateItems = ({id, name, quantity}) => {     //переменная, которая прилетает, обворачивается в объект
      let newItems = items.map((item) => {
        if(item.id === id){
          item.name = name;
          item.quantity = quantity;
        } 
        return item;
      });
      setItems(newItems);
  }

  const deleteItem = (id) => {
      let newItems = items.filter((item) => {
       return item.id !== id
    })
      setItems(newItems);
  }
  
  const addField = () => {
      setItems([...items, {
        id: !items.length ? 0 : items[items.length - 1].id + 1, 
        name: '', 
        quantity: 0, 
        color: '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6), 
        dasharray: ``,
        dashoffset: ``,
      }])
  } 

  const renderFieldComponents = () => {   
    console.log('kkd')
        return (
          <div>
           <div className="field_components">{
              items.map((item) => {
                return <Field updateItems={updateItems} id={item.id} deleteItem={deleteItem} key={items.id} />
              })
           }</div>
               <div className="add_field_container">
                 <button className="add_button button"onClick={()=>{
                   addField();
                 }}>Add item</button>
               </div>
         </div>
        )
  }

  const signIn = () => {
      return (
        <div>
          <div className="form signin_form">
            <h2>To use PieChart enter a name and password</h2>
            <form>
              <div className="input">
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
              </div>
              <div className="input">
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
            </div>
            </form>
            <button className="login_button button" onClick={() => {
              if(user === authenticationInfo.user && password === authenticationInfo.password){
                setShowList(true)
              };
            }}>Submit</button>
          </div>
        </div>
      )
  }

  const logOut = () => {
    return (
      <div>
        <button className="logout_button button" onClick={() => {
          setShowList(false);
        }}>Log out</button>
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
