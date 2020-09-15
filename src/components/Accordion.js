import React, { useState } from 'react'


const Accordion = ({ items }) => {
    // State via hooks! destructure each piece of set [state, setState] w/ useState();
    // Must use new set of variables for each piece of state (ie activeIndex, searchTerm, etc)
    const [activeIndex, setActiveIndex] = useState(null);

    // When clicking each accordion title, call this to set the activeIndex, appending 'active' className to div
    const onTitleClick = (index) => {
        setActiveIndex(index);
    }

    // Here we create the accordion contents w/ Fragment, mapping every item from <App/> to each section
    const renderedItems = items.map((item, index) => {
        // Check if a given section title has been clicked on, adding appropriate className to its div
        const active = index === activeIndex ? 'active' : '';

        return (
            <React.Fragment key={item.title}>
                <div className={`title ${active}`} onClick={() => onTitleClick(index)}>
                    <i className="dropdown icon"></i>
                    {item.title}
                </div>
                <div className={`content ${active}`}>
                    <p>{item.content}</p>
                </div>
            </React.Fragment>
        )
    }); 

    
    // render it all, baby
    return (
        <div className="ui styled accordion">
            {renderedItems}
        </div>
    );
}


export default Accordion;