import { useEffect, useState } from 'react';

// 'children' because when a component is passed as a prop this is its name
const Route = ({ path, children }) => {
    // Literally all I do is force myself to rerender
    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    // Changes the displayed component without reloading the page
    useEffect(() => {
        // I'm gonna do it I'm gonna rerender I swear!
        const onLocationChange = () => {
            // had to do it to em
            setCurrentPath(window.location.pathname);
        };

        // listen for the popstate event in <Link />
        window.addEventListener('popstate', onLocationChange);

        // cleanup if I wanna remove this later on!
        return () => {
            window.removeEventListener('popstate', onLocationChange);
        };
    }, []);


    return currentPath === path ? children : null;
};

export default Route;