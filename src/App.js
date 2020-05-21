import React, { useState ,useEffect} from 'react'
import axios from 'axios'

import Search from './components/Search'
import Results from './components/Results'
import Popup from './components/Popup'

function App() {
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {}
  });
  const [searchby,setSearchby] = useState('title');
  const [year,setYear] = useState('2020');

  const apiurl = "http://www.omdbapi.com/?apikey=bcacae2";


  useEffect(() => {
    
    axios(apiurl + "&s=avenger" ).then(( data ) => {
      let results = data.data.Search;
      setState(prevState => {
       return { ...prevState, results: results }
      })
    });
    
    
  }, [])
  
  

  
  const search = (e) => {
    if (e.key === "Enter") {
      if(searchby === 'title'  ){
        axios(apiurl + "&s="  +state.s ).then(({ data }) => {
          let results = data.Search;
          if(Array.isArray(results)){
            setState(prevState => {
              return { ...prevState, results: results }
            })
          }else{
            console.log('not found');
          }
          
        });
      }else{
        console.log(state.s,year);
        axios(apiurl + "&s="+ state.s + "&y=" + year ).then(({ data }) => {
          let results = data.Search;
          if(Array.isArray(results)){
            setState(prevState => {
              return { ...prevState, results: results }
            })
          }      
        });
      }
      
    }
  }
  
  const handleInput = (e) => {
    let s = e.target.value;

    setState(prevState => {
      return { ...prevState, s: s }
    });
  }


  const selectDropdown  =(e)=>{
    console.log(e.target.value);
    let data = e.target.value;
    setSearchby(data);
  }
  

   const onDropdownyear =(e)=>{
     console.log(e.target.value);
     let data = e.target.value;
     setYear(data);
   }
   
   

  const openPopup = id => {
    axios(apiurl + "&i=" + id).then(({ data }) => {
      let result = data;

      console.log('my result',result);

      setState(prevState => {
        return { ...prevState, selected: result }
      });
    });
  }

  const closePopup = () => {
    setState(prevState => {
      return { ...prevState, selected: {} }
    });
  }

  return (
    <div className="App">
      <header>
        <h1>Movies</h1>
      </header>
      <main>
        <Search handleInput={handleInput} search={search}  selectDropdown={selectDropdown} onDropdownyear={onDropdownyear} onDropdown={searchby} />

        <Results results={state.results} openPopup={openPopup} />

        {(typeof state.selected.Title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} /> : false}
      </main>
    </div>
  );
}

export default App
