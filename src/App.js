import {useState, useEffect} from 'react';
import GameCard from './GameCard/GameCard'
import Loader from './Loader/Loader'
import './App.css';

function App() {
  
  const [gameState,setGameState] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchState, setSearchState] = useState("")
  const [groupFilter, setGroupFilter] = useState("")
  const [levelFilter, setLevelFilter] = useState("")

  
  const cors_fix = "https://afternoon-ridge-35420.herokuapp.com/";
  const url = "https://bit.ly/TeaserTask";
  
  const fetchData = async() =>{
    try{
      const res = await fetch(cors_fix+url);
      const response = await res.json();
      console.log(response);
      setGameState(response);
      
    }catch(e){
      console.log(e)
    }
  };
  
  useEffect(() =>{
    fetchData();
    setIsLoaded(true);
  }, [])
  
  let loadingScreen = null
  while (isLoaded === false) {
    loadingScreen= (<Loader/>)
  }
  
  

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
          return (<GameCard title={game.GameTitle} desc={game.GameDescription} image={game.GameImage} key={game.GameTitle}/>)
        })
        }
    </div>

  )
}
  

  return (
    <div className="App">
      <div className="jumbotron">
      <header className="header">9ija Kids Game List</header>
      <input type ="search" onChange={setSearchTerm} placeholder="Search" value={searchState} className="searchBar"/>
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
      {loadingScreen}
      {content}
    </div>
  )
}

export default App;
