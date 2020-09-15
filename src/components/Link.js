import React from 'react';


// We want to revent reloading the entire app when changing pages
// Gotta get around navigating "pages" and work some React magic instead
const Link = ({ className, href, children }) => {
    const onClick = (e) => {
        // return early to ensure user can still ctrl+click and open in new tab
        if(e.metaKey || e.ctrlKey) {
            return;
        }

        // prevents reloading
        e.preventDefault();

        // changes the URL (for bookmarking or direct linking)
        window.history.pushState({}, '', href);

        // create an event for the <Route /> event listener to change displayed component
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    }

    return <a onClick={onClick} className={className} href={href}>{children}</a>;
}

export default Link;