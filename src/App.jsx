
import { RouterProvider } from 'react-router-dom'
import './App.css'
import { createBrowserRouter } from 'react-router'
import PasswordGenerator from './pages/PasswordGenerator'
import QRFrame from '../qrcode_menu/iframe'
import QRGenerator from '../qrcode_menu/content'

function App() {

  const route = createBrowserRouter([
    {
      element: <h1>Home Page</h1>,
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
