import { Routes, Route } from 'react-router-dom';

// pages
import Home from './views/index';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
