
import { RouterProvider } from 'react-router-dom'
import './App.css'
import { createBrowserRouter } from 'react-router'
import PasswordGenerator from './pages/PasswordGenerator'

function App() {

  const route = createBrowserRouter([
    {
      element: <h1>Home Page</h1>,
      path: "/"
    },
    {
      element: <h1>QR code generator</h1>,
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
