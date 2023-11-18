import './App.css'
import { Route,Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import AboutUs from './Pages/AboutUs'
import ErrorPage from './Pages/ErrorPage'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import CourseList from './Pages/Course/CourseList'
import ContactUs from './Pages/ContactUs'
import Denied from './Pages/Denied'
import CourseDescription from './Pages/Course/CourseDescription.jsx'
import RequireAuth from './Components/Auth/RequireAuth'
import CreateCourse from './Pages/Course/CreateCourse'
import Profile from './Pages/User/Profile'
import EditProfile from './Pages/User/EditProfile'
import Checkout from './Pages/Payment/Checkout'
import CheckoutSuccess from './Pages/Payment/CheckoutSuccess'
import CheckoutFail from './Pages/Payment/CheckoutFail'
import Displaylecture from './Pages/Dashboard/Displaylecture.jsx'
import AddLecture from './Pages/Dashboard/AddLecture.jsx'
import AdminDashboard from './Pages/Dashboard/AdminDashboard.jsx'

function App() {

  return (
   <>
    <Routes>
      <Route path='/' element={<HomePage/>}></Route>
      <Route path='/contact' element={<ContactUs/>}></Route>
      <Route path='/about' element={<AboutUs/>}></Route>\
      <Route path='/signup' element={<SignUp/>}></Route>
      <Route path='/login' element={<Login/>}></Route>

      <Route path='/courses' element={<CourseList/>}></Route>
      <Route path='/course/description' element={<CourseDescription/>}></Route>

      <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
        <Route path='/course/create' element={<CreateCourse/>} />
        <Route path='/course/addlecture' element={<AddLecture/>} />
        <Route path='/admin/dashboard' element={<AdminDashboard/>} />
      </Route>

      <Route element={<RequireAuth allowedRoles={["ADMIN","USER"]} />}>
        <Route path='/user/profile' element={<Profile/>} />
        <Route path='/user/editprofile' element={<EditProfile/>} />
        <Route path='/checkout' element={<Checkout/>} />
        <Route path='/checkout/success' element={<CheckoutSuccess/>} />
        <Route path='/checkout/fail' element={<CheckoutFail/>} />
        <Route path='/course/displaylecture' element={<Displaylecture/>}></Route>
      </Route>


      <Route path='*' element={<ErrorPage />}></Route>
      <Route path='/denied' element={<Denied/>}></Route>
    </Routes>
   </>
  )
}

export default App
