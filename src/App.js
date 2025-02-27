import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';


function App() {
  
  const [name, setName] = useState("")
  const [country, setCountry] = useState([])
  const [gender, setGender] = useState({})
  const [age, setAge] = useState("")

  
  const handleName = (e) => {
   setName(e.target.value)
  }
  const handleFind = async () => {
    console.log(name)
    const resCountry = await axios.get(`https://api.nationalize.io?name=${name}`)
    const resGender = await axios.get(`https://api.genderize.io?name=${name}`)
    const resAge = await axios.get(`https://api.agify.io?name=${name}`)
    setCountry([...resCountry.data.country])
    setGender({gender:resGender.data.gender,
      probability:resGender.data.probability
    })
    setAge(resAge.data.age)
    console.log(resAge.data.age);
    
    
    //console.log(resCountry.data.country)

  }

  const listCountries = country.map(el=><li>
    <img src={`https://flagsapi.com/${el.country_id}/shiny/64.png`}></img><span>{Math.round(el.probability*100)}%</span>
  </li>)

  return (
    <div className="App">
   <div className='wrapper'>
      <div className='controls'>
         <input onChange={handleName}></input>
         <button onClick={handleFind}>Find</button>
      </div>
       <ul>
        <h3>Nationality</h3>
        {listCountries}
       </ul>
       <h3>Gender</h3>
       <p>{gender.gender}    {gender.probability*100}%</p>
       <h3>Age</h3>
       <p>{age}</p>
   </div>
    </div>
  );
}

export default App;
