import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import About from './pages/About'
import Admin from './pages/Admin'
import Interview from './pages/Interview'
import User from './pages/User'
import Feedback from './pages/Feedback'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<Admin />} />
        <Route path='/interview/:id' element={<Interview />} />
        <Route path='/user' element={<User />} />
        <Route path='/feedback' element={<Feedback />} />

      </Routes>
    </div>
  )
}

export default App
