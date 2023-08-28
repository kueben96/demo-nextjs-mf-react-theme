import React, { lazy } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { Button, ThemeProvider, Typography, createTheme } from '@mui/material'
// import { MyButton } from "landing";

const App = () => {
    const MyButton = lazy(() => import('landing/Button'));
    const ServicesCard = lazy(() => import('landing/ServicesCard'));
    // TODO: implement more generic navigation
    // TODO: navigateToOtherMicroFrontend("/auth")
    // TODO: is there a solution to retrieve these functions from shell? 
    const navigateToAuthApp = () => {
        window.dispatchEvent(
            new CustomEvent("[external] navigated",
                { detail: '/auth/login' })
        );
    }

    const handleClick = () => {
        console.log("clicked next button")
    }

    const [theme, setTheme] =
        React.useState(null);


    React.useEffect(() => {
        import('theme/theme')
            .then((sharedTheme) =>
                setTheme(
                    sharedTheme.default
                ),
            )
            .catch((error) =>
                console.error(
                    'Error loading shared theme',
                    error
                )
            );
    }, []);


    if (!theme) {
        return (
            <div>
                Loading theme...
            </div>
        );
    }


    return (
        <ThemeProvider theme={theme}>
            <h1>Marketing App</h1>
            <React.Suspense fallback="Loading...">
                <ServicesCard />
            </React.Suspense>
            {/* Communicate back to Container/parent */}
            <React.Suspense fallback="Loading...">
                <MyButton onClick={handleClick} />
            </React.Suspense>
            <Typography variant='h1'>Marketing App</Typography>
            <Button onClick={navigateToAuthApp}>auth</Button>
            <Link to='/contribute'>Contribute</Link>
            <Link to='/about'>About</Link>
            <Link to='/documentation'>Documentation</Link>
            <Outlet />
        </ThemeProvider>
    )
}

export default App