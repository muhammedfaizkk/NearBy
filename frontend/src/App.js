
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footerres from "./componetns/Footerres";
import Home from "./componetns/Home";
import Navbares from "./componetns/Navbares";
import 'bootstrap/dist/css/bootstrap.min.css';
import Addrestaurant from "./componetns/Addrestaurant";
import AddresSignup from "./componetns/AddresSignup";
import AddresLogin from "./componetns/AddresLogin";
import AddresHome from "./componetns/AddresHome";
import Restuarantdetais from "./componetns/Restuarantdetais";
import UserProfile from "./componetns/UserProfile";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useSelector } from "react-redux";
import './componetns/style.css'
import UpdateRestaurants from "./componetns/UpdateRestaurants";
import Myrestaurants from "./componetns/Myrestaurants";
import UsersList from "./componetns/UsersList";
import Riviewsection from "./componetns/Riviewsection";




function App() {

  const isAuth = useSelector((state) => state.users.isAuth);

  return (

    <div>
      <BrowserRouter>
        <Navbares />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<AddresSignup />} />
          <Route path="/login" element={<AddresLogin />} />
          <Route path="/dashboard" element={<ProtectedRoute isAuth={isAuth}><AddresHome /></ProtectedRoute>} />
          <Route path="/addres" element={<ProtectedRoute isAuth={isAuth}><Addrestaurant /></ProtectedRoute>} />
          <Route path="/riview" element={<Riviewsection/>} />
          <Route path="/details" element={<ProtectedRoute isAuth={isAuth}><Restuarantdetais /></ProtectedRoute>} />
          <Route path="/userProfile/:id" element={<UserProfile />} />
          <Route path="/restuarantdetais/:id" element={<Restuarantdetais />}/>
          <Route path="/updateres/:id" element={<ProtectedRoute isAuth={isAuth}><UpdateRestaurants /></ProtectedRoute>} />
          <Route path="/myRes" element={<ProtectedRoute isAuth={isAuth}><Myrestaurants /></ProtectedRoute>} />
          <Route path="/userlist" element={<ProtectedRoute isAuth={isAuth}><UsersList /></ProtectedRoute>} />
        </Routes>
        <Footerres />
      </BrowserRouter>

    </div>


  );
}

export default App;
