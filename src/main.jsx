import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

import './index.css'
import ErrorPage from './components/ErrorPage'
import About from './routes/About'
import Contact from './routes/Contact'
import Homepage from './routes/Homepage'
import Landing from './routes/Landing'
import Login from './routes/Login'
import PostReview from './routes/PostReview'
import Reviews from './routes/Reviews'
import Root from './routes/Root'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { 
        index: true,
        element: <Landing />
      },
      {
        path: "home",
        element: <Homepage />
      },
      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "reviews/",
        element: <Reviews />,
        children: [
          {
            path: "post",
            element: <PostReview />
          }
        ]
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "about",
        element: <About />
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
