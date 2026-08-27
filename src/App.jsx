import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage/>}/>

          <Route path='/admin' element={<></>}/>
          <Route path='/admin/student' element={<></>}/>
          <Route path='/admin/courses' element={<></>}/>
          <Route path='/admin/exams' element={<></>}/>
          <Route path='/admin/exams/:id/questions' element={<></>}/>
          <Route path='/admin/exams/:id/results'/>

          <Route path='/student' element={<></>}/>
          <Route path='/student/exams/:id' element={<></>}/>
          <Route path='/student/exams/:id/result' element={<></>}/>
          <Route path='/student/results' element={<></>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
