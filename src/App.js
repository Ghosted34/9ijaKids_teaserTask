import {useState, useEffect} from 'react';
import axios from 'axios';
import GameCard from './GameCard/GameCard'
import './App.css';

function App() {
  
  const [gameState, setGameState] = useState(
    [{"GameTitle":"Before and After","GameDescription":"Before and After Yr 2 (prefix and suffix)","Topic":"Word Works and Spelling","Group":"Academic","Level":"Key Stage 1","Subject":"English","GameImage":"https://partners.9ijakids.com/index.php/thumbnail?game=Before and After"},
    {"GameTitle":"Communication","GameDescription":"Communication Yr 2 (different ways we can communicate)","Topic":"Social Studies","Group":"Academic","Level":"Key Stage 1","Subject":"Social Studies","GameImage":"https://partners.9ijakids.com/index.php/thumbnail?game=Communication"},
    {"GameTitle":"Kiddiepreneur 101","GameDescription":"Kiddiepreneur 101 (Intro to Earning and Spending)","Topic":"Financial Literacy","Group":"Financial Literacy","Level":"Financial Literacy","Subject":"Financial Literacy","GameImage":"https://partners.9ijakids.com/index.php/thumbnail?game=Kiddiepreneur 101"},
    {"GameTitle":"Money Matters","GameDescription":"Money Matters (Intro to Key Financial Terms)","Topic":"Financial Literacy","Group":"Financial Literacy","Level":"Financial Literacy","Subject":"Financial Literacy","GameImage":"https://partners.9ijakids.com/index.php/thumbnail?game=Money Matters"},
    {"GameTitle":"Maths Pop","GameDescription":"Maths Pop (writing numbers in word, sequencing & ordinal numbers)","Topic":"Number Sense","Group":"Academic","Level":"Key Stage 1","Subject":"Mathematics","GameImage":"https://partners.9ijakids.com/index.php/thumbnail?game=Maths Pop"},
    {"GameTitle":"Exploring Life","GameDescription":"Exploring Life KS","Topic":"Living Things & Non-Living Things","Group":"Academic","Level":"Key Stage 1","Subject":"Science","GameImage":"https://partners.9ijakids.com/index.php\/thumbnail?game=Exploring Life"},
    {"GameTitle":"Mathsmania City - Decimals","GameDescription":"Mathsmania City - Decimal","Topic":"Decimals, Fractions & Percentage","Group":"Academic","Level":"Key Stage 2","Subject":"Mathematics","GameImage":"https://partners.9ijakids.com/index.php/thumbnail?game=Mathsmania City - Decimals"}]
  );

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
