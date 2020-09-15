import React, { useState, useEffect, useRef } from 'react'


const Dropdown = ({ label, options, selected, onSelectedChange, subhead }) => {
    // These toggle the dropdown open/closed by changing classNames
    const [open, setOpen] = useState(false);
    // Set a ref on topmost div so we can know if we're clicking on anything made from <Dropdown />
    const ref = useRef();


    // If you click an option or outside the dropdown, it closes.
    // Without the 'if' the dropdown stays open when clicked due to event bubbling order (manual listener > react listener)
    useEffect(() => {
        const onBodyClick = (e) => {
            if(ref.current.contains(e.target)) {
                return;
            }

            setOpen(false);
        };

        document.body.addEventListener('click', onBodyClick);

        // In case <Dropdown /> is ever removed from DOM, cleanup prevents a null ref error
        return () => {
            document.body.removeEventListener('click', onBodyClick);
        };
    }, []);


    // Map the options to dropdown list items
    // onClick sets state to the clicked option, changing the selected value
    const renderedOptions = options.map((option) => {
        // Hide the currently selected option from the dropdown
        if(option === selected) {
            // returning null tells react to not render this option
            return null;
        }

        return (
            <div
                key={option.value}
                className="item"
                onClick={() => onSelectedChange(option)}
            >
                {option.label}
            </div>
        );
    });


    return (
        <div ref={ref} className="ui form">
            <div className="field">
                <label className="label">{label}</label>
                <div
                    onClick={() => setOpen(!open)}
                    className={`ui selection dropdown ${open ? 'visible active' : ''}`}
                >
                    <i className="dropdown icon"></i>
                    <div className="text">{selected.label}</div>
                    <div
                        onClick={() => setOpen(!open)}
                        className={`menu ${open ? 'visible transition' : ''}`}
                    >
                        {renderedOptions}
                    </div>
                </div>
                <br></br><br></br>
                <label className="label">{subhead}</label>
            </div>
        </div>
    );
}


export default Dropdown;