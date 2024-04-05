import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  redirect,
  RouterProvider
} from 'react-router-dom'

import './index.css'
import ErrorPage from './components/ErrorPage'
import Homepage from './routes/Homepage'
import Reviews from './routes/Reviews'
import Review from './routes/Review'
import AdminReviews from './routes/AdminReviews'
import AdminReview from './routes/AdminReview'
import Root from './routes/Root'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Homepage />
      },
      {
        path: "reviews/",
        element: <Reviews />,
      },
      {
        path: "review/:reviewId",
        element : <Review />
      },
      {
        path: "admin/reviews/",
        element: <AdminReviews />
      },
      {
        path: "admin/review/:reviewId",
        element: <AdminReview />
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
