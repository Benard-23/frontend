import './App.css';
import { Routes, Route } from "react-router-dom";

import { UserContextProvider } from './UserContext';
import Layout from './component/Layout';
import Post from './component/Post'; // make sure the file path is correct
import CreatePost from './component/pages/CreatePost';
import IndexPage from './component/pages/IndexPage';
import LoginPage from './component/pages/LoginPage';
import RegisterPage from './component/pages/RegisterPage';
import PostPage from './component/pages/PostPage';
import EditPost from './component/pages/EditPost';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="create" element={<CreatePost />} />
          <Route path="post/:id" element={<PostPage />} />   {/* single post */}
          <Route path="/edit/:id" element={<EditPost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;




