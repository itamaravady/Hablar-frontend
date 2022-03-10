import { HomePage } from './pages/home-page.jsx'
import { AboutUs } from './pages/about-us.jsx'
import { LoginSignup } from './pages/LoginSignup.jsx';

const routes = [
    {
        path: '/',
        component: <HomePage />,
        label: 'Home',
    },
    {
        path: 'authenticate',
        component: <LoginSignup />,
    },
    {
        path: 'about',
        component: <AboutUs />,
        label: 'About us'
    }
]

export default routes;