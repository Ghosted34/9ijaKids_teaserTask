import {useState, useEffect} from 'react';
import axios from 'axios';
import GameCard from './GameCard/GameCard'
import './App.css';

function App() {
  const url = "https://partners.9ijakids.com/index.php?partnerId=555776&accessToken=l0lawtvv-94bv-oi4d-u808-5ubz&action=catalogfilter";
  const [gameState, setGameState] = useState(null);

  const fetchData = async() =>{
    try{
      axios.create({
        header: {
          'Content-Type': 'application/json'
        }
      });
      const response = await axios.get(url)
      console.log(response)
      setGameState(response.data)
    }catch(e){
      console.log(e)
    }
  };
  
useEffect(() =>{
  fetchData();
}, [])


  const [searchState, setSearchState] = useState("")
  const [groupFilter, setGroupFilter] = useState("")
  const [levelFilter, setLevelFilter] = useState("")

  const setSearchTerm =(event)=>{
      setSearchState(event.target.value);
  }
  const setGroupFilterTerm = (event) => {
    setGroupFilter(event.target.value)
  }

  const setLevelFilterTerm = (event) => {
    setLevelFilter(event.target.value)
  }
  const renderList =()=> {
    return gameState.filter(game =>
      game["Topic"].toLowerCase().includes(searchState.toLowerCase().trim())
      && game["Group"].toLowerCase().includes(groupFilter.toLowerCase().trim())
      && game["Level"].toLowerCase().includes(levelFilter.toLowerCase().trim()));
  }
  




let content = null

if(gameState){
  content = (
    <div>
        {renderList().map(game =>{
          return (<GameCard title={game.GameTitle} desc={game.GameDescription} image={game.GameImage}/>)
        })
        }
    </div>

  )
}
  

  return (
    <div className="App">
      <div className="jumbotron">
      <header className="header">9ija Kids Game List</header>
      <input type ="text" onChange={setSearchTerm} placeholder="Search" value={searchState} className="searchBar"/>
      </div>
     
     <div className="filter">

      
        <label className="dropdown">Group Filter
      <select onChange={setGroupFilterTerm} value={groupFilter}>
        <option key="none" value="">None</option>
        <option key="Academic" value="Academic">Academic</option>
        <option key="Financial Literacy" value="Financial Literacy">Financial Literacy</option>
      </select>
      </label>
      
      
        <label className="dropdown">Level Filter
      <select onChange={setLevelFilterTerm} value={levelFilter}>
        <option key="none" value="">None</option>
        <option key="Key Stage 1" value="Key Stage 1">Key Stage 1</option>
        <option key="Key Stage 2" value="Key Stage 2">Key Stage 2</option>
        <option key="Financial Literacy" value="Financial Literacy">Financial Literacy</option>
      </select>
      </label>
      
      

     </div>
      {content}
    </div>
  )
}

export default App;
