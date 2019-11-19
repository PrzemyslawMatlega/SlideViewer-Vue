import TheViewer from  './components/Viewer/TheViewer'
import TheViewerUpload from './components/Viewer/TheViewerUpload'
import TheViewerPopup from './components/Viewer/TheViewerPopup'
import Login from './components/Login';

export const routes = [
    {
        path: '',
        component: TheViewer,
        children: [
            {
                path: '/upload',
                component: TheViewerUpload
            },
     
        ]
    },
    {
        path: '/login',
        component: Login,
    }
]