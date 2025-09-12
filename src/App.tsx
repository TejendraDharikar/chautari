
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './components/Login'
const router=createBrowserRouter([
  {
    path:"/",
    element:<Login/>
  },{
    path :"/home",
    element:<Home/>
  }
])
function App() {
  return (
    <>
     <RouterProvider router={router}/>
    </>
  )
}

export default App;
