import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import SignIn from "./components/SignIn";
import User from "./components/User";
import Explore from "./components/Explore";
import Post from "./components/Post";

function App() {
  const [posts, setPosts] = useState([]); // State to store all posts

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/*Home route  */}
        <Route path="/about" element={<About />} /> {/*About route */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/explore" element={<Explore posts={posts} />} />
        <Route path="/user" element={<User />} />
        <Route path="/post" element={<Post setPosts={setPosts} />} />
      </Routes>
    </Router>
  );
}

export default App;
