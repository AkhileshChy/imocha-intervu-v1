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
import FinalAnalysis from './pages/FinalAnalysis'
import PrivateRoute from './context/PrivateRoute'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path="/admin" element={<Admin />} />
          <Route path='/interview/:id' element={<Interview />} />
          <Route path='/user' element={<User />} />
          <Route path='/feedback' element={<Feedback />} />
          <Route path='/final-analysis' element={<FinalAnalysis />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        </Route>
      </Routes>
    </div>
  )
}

export default App
