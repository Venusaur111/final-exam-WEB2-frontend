import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import Login from "./pages/login/Login";
import Dashboard from "./pages/admin/Dashboard";
import StudentPage from "./pages/admin/StudentPage";



const HomeRedirect = ()=>{
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Navigate
      to={user?.role === "admin" ? "/admin" : "/student"}
      replace
    />
  );
};

const App = ()=> {
  return(
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path="*" element={<HomeRedirect />}/>

            <Route element={<ProtectedRoute role="admin" />}>
              <Route element={<Layout />}>
                <Route path="/admin" element={<Dashboard/>}/>
                <Route path="/admin/students" element={<StudentPage/>}/>
                <Route path="/admin/courses"/>
                <Route path="/admin/exams"/> {/**route for exam lists */}
                <Route path="/admin/exams/:id/questions"/> {/**route for seing a specific exam */}
                <Route path="/admin/exams/:id/results"/> 

              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
  
}

export default App;