// App.js
// import React from 'react';
// import Header from './App';
// import Body from './main';


// function App() {
//   return (
//     <div>
//       <Header />
//       <Body />
//     </div>
//   );
// }

// export default App;
// parent.js


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './App';
import Body from './main';
import About from './about'; 

function App() {
  return (
    <Router>
      <div>
         <Header /> 
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


