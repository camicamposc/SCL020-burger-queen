import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import LogIn from "./component/LogIn";
import VistaMesero from "./component/VistaMesero";


function App() {
  return (
    <div className="App">
     
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/about" element={<VistaMesero />} />
        </Routes>
    </div>
  );
}

 /* function Home() {
   return (
     <>
       <main>
         <h2>Welcome to the homepage!</h2>
         <p>You can do this, I believe in you.</p>
       </main>
       <nav>
         <Link to="/about">About</Link>
       </nav>
     </>
  );
 }*/

/*function About() {
  return (
    <>
     <Routes>
        <Route path="/" element={<VistaMesero />} />
        <Route path="about" element={<About />} />
        </Routes>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}*/

export default App;

