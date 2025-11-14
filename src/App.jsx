
import { RouterProvider } from 'react-router-dom'
import './App.css'
import { createBrowserRouter } from 'react-router'
import PasswordGenerator from './pages/PasswordGenerator'
import QRGenerator from './pages/qrcode_menu/content'
import Home from './pages/Home/Home'

function App() {

  const route = createBrowserRouter([
    {
      element: <Home/>,
      path: "/"
    },
    {
      element: <QRGenerator/>, 
      // element: <QRFrame />,
      path: "/qr-code-generator"
    },
    {
      element: <PasswordGenerator/>,
      path: "/password-generator"
    }
  ])

  return (
    <>
    <RouterProvider router={route}></RouterProvider>
    </>
  )
}

export default App
