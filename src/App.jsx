import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import NewUser from "./pages/new_user";
import Dashboard from "./pages/dashboard";
import Edit from "./pages/edit";

const App = () => {
  return (        
    <>
      <Header/>
      <Routes> 
        <Route path="/" element={<Dashboard/>} />                    
        <Route path="/new_user" element={<NewUser/>} />      
        <Route path="/edit/:id" element={<Edit/>} />  
      </Routes>
    </>
  );
};

export default App;
