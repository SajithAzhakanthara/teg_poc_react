import Header from "./components/header/Header";
import 'bootstrap/dist/css/bootstrap.css';
import {Route,Routes } from 'react-router-dom';
import Search from './components/Search/Search';
import Listing from './components/listing/Listing';
import ListingTwo from "./components/listingTwo/ListingTwo";


function App() {
  return (
       <div className="App">
         <Header/>
         <Routes>
            <Route exact path="/" element={<Search/>}/>
            <Route exact path="/listing" element={<Listing/>}/>
            <Route exact path="/listing2" element={<ListingTwo/>}/>
         </Routes>
       </div>
  );
}

export default App;
