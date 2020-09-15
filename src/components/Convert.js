import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Convert = ({ language, text }) => {
    const [translated, setTranslated] = useState('');
    const [debouncedText, setDebouncedText] = useState(text);

    // Debounce the input to prevent flooding the API with requests
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedText(text);
        }, 500);

        return () => {
            clearTimeout(timerId);
        };
    }, [text]);

    
    // Make an axios request to google translate 
    useEffect(() => {
        const makeTranslation = async () => {
            // empty object for second arg
            const { data } = await axios.post('https://translation.googleapis.com/language/translate/v2', {}, {
                params: {
                    q: debouncedText,
                    target: language.value,
                    key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM'
                }
            });

            setTranslated(data.data.translations[0].translatedText);
        };

        makeTranslation();
    }, [language, debouncedText]);


    return (
        <div>
            <h1 className="ui header">{translated}</h1>
        </div>
    )
};


export default Convert;