
import { RouterProvider } from 'react-router-dom'
import './App.css'
import { createBrowserRouter } from 'react-router'
import PasswordGenerator from './pages/PasswordGenerator'
import QRGenerator from './pages/QRGenerator'

function App() {

  const route = createBrowserRouter([
    {
      element: <h1>Home Page</h1>,
      path: "/"
    },
    {
      element: <QRGenerator/>, 
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
