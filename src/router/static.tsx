import { RouteObject } from 'react-router-dom'
import IndexLayout from '/@/layouts/Index'
import HomePage from '/@/pages/home'
import ErrorPage from '/@/pages/ErrorPage'
import CategoryIndex, { loader as CategotyIndexLoader } from '../pages/video/CategoryIndex'
import VideoDetail, { loader as VideoDetailLoader } from '../pages/video/VideoDetail'


const staticRoutes: Array<RouteObject> = [
    {
        path: '/',
        element: <IndexLayout />,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                errorElement: <ErrorPage></ErrorPage>,
                children: [
                    {
                        index: true,
                        element: <HomePage />
                    },
                    {
                        path: '/:topCategory',
                        loader: CategotyIndexLoader,
                        element: <CategoryIndex></CategoryIndex>,
                    },
                    {
                        path: '/:topCategory/:subCategory',
                        loader: CategotyIndexLoader,
                        element: <CategoryIndex></CategoryIndex>,
                    },
                    {
                        path: '/detail/:top/:sub/:id',
                        loader: VideoDetailLoader,
                        element: <VideoDetail />,
                    },
                    {
                        path: '/detail/:top/:id',
                        loader: VideoDetailLoader,
                        element: <VideoDetail />,
                    }
        ]
    },
]
    }
]

export { staticRoutes }