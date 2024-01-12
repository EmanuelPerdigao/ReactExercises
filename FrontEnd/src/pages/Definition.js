import { useState, useEffect } from "react"
import { redirect, useParams, Link } from "react-router-dom";
import notFound from "../components/NotFound";
import DefinitionSearch from "../components/DefinitionSearch"

export default function Definition() {
    const [error, setError] = useState(false);
    const [apiResponse, setApiResponse] = useState();
    let { search } = useParams();
    //const url = "https://httpstat.us/501";
    const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + search;

    useEffect(() => {
        fetch(url)
            .then((response) => {
                
                if (!response.ok) {
                    setError(true);
                    throw new Error('Something went wrong!');
                }
                return response.json();
            })
            .then((data) => {
                setApiResponse(data[0].meanings);
            })
            .catch((e) => {
                console.log(e.message);
            });
    }, []);

    if (error) {
        return (
            <>
                <p>Error</p>
                <Link to="/definition">return to search page</Link>
            </>
        );
    }

    return (
        <>
            {apiResponse ? (
                <>
                    <p>Here is a definition of-{search}:</p>

                    {apiResponse.map((meaning) => {
                        return (
                            <p>
                                {meaning.partOfSpeech + ' :'}
                                {meaning.definitions[0].definition}
                            </p>
                        );
                    })}
                    <p>Search again!</p>
                    <DefinitionSearch></DefinitionSearch>
                </>
            ) : null
            }
        </>
    );
}