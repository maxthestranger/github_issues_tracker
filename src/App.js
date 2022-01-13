import { Routes, Route } from 'react-router-dom';

// pages
import Home from './views/index';
import Repo from './views/repo';
import User from './views/user';

function App() {
  return (
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route path=":userName" element={<User />} />
      <Route path=":userName/:repoName" element={<Repo />} />
    </Routes>
  );
}

export default App;
