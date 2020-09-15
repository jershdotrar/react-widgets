import React , { useState, useEffect } from 'react'
import axios from 'axios';


const Search = () => {
    const [term, setTerm] = useState('');
    const [results, setResults] = useState([]);

    // Can't use async/await on the first argument, instead use it on an inner temp variable (or IIFE!)
    useEffect(() => {
        const search = async () => {
            // gonna get thicc here so this comment is for legibility. Remember: axios.get takes two args!
            // extract the data from the search, then setResults to the actual search results (.query.search) in the JSON
            const { data } = await axios.get('http://en.wikipedia.org/w/api.php', {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: term
                }
            });
            setResults(data.query.search);
        };

        // Delay search request until user has creased typing for 500ms
        // STEP 1: Grab timeout ID!
        const timeoutId = setTimeout(() => {
            // Don't start searching until something is typed (cause it don't like the default '' in setTerm)
            if(term) search();
        }, 500);
        
        // STEP 2: Use useEffect's cleanup feature to auto-clear any timeout started at last re-render!
        return () => {
            clearTimeout(timeoutId);
        }

    }, [term]);


    // Map search results to JSX list
    // NEVER EVER use dangerouslySetInnerHTML, *only for this little app!* XSS attacks are critical failure
    const renderedResults = results.map((result) => {
        return (
            <div key={result.pageid} className="item">
                <div className="right floated content">
                    <a className="ui button" href={`https://en.wikipedia.org?curid=${result.pageid}`}>Go</a>
                </div>
                <div className="content">
                    <div className="header">{result.title}</div>
                    <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
                </div>
            </div>
        );
    });


    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter Wikipedia Search Term</label>
                    <input
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                        className="input"
                    />
                </div>
            </div>
            <div className="ui celled list">
                {renderedResults}
            </div>
        </div>
    );
}


export default Search;