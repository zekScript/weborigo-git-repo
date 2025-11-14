
import { RouterProvider } from 'react-router-dom'
import './App.css'
import { createBrowserRouter } from 'react-router'
import PasswordGenerator from './pages/PasswordGenerator'
import QRGenerator from './pages/QRGenerator'
import QRBusinessCardGenerator from './pages/QRBusinessCardGenerator'

function App() {

  const route = createBrowserRouter([
    {
      element: <Home/>,
      path: "/"
    },
    {
      element: <QRGenerator/>, 
      path: "/qr-code-generator"
    },
    {
      element: <QRBusinessCardGenerator/>,
      path: "/qr-business-card-generator"
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
