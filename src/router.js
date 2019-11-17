import TheViewer from  './components/Viewer/TheViewer'
import TheViewerUpload from './components/Viewer/TheViewerUpload'
export const routes = [
    {
        path: '',
        component: TheViewer,
        children: [
            {
                path: '/upload',
                component: TheViewerUpload
            }
        ]
    },
]