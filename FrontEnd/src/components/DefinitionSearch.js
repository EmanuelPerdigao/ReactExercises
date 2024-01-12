import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DefinitionSearch() {
    const [word, setWord] = useState();
    const navigate = useNavigate();

    useEffect(() => {

    }, [word]);


    return (
        <form className = "flex justify-center space-x-2 max-w-[300px]"
        onSubmit={() => {
            navigate('/dictionary/' + word);
        }}>
            <input className = "shrink min-w-0 px-2 py-1 rounded" placeholder = "Try some word" type="text" onChange={(e) => {
                setWord(e.target.value);
            }}>
            </input>

            <button className="bg-green-600 hove:bg-purple-700 text-white font-bold py-1 px-2 rounded">Click Here</button>
        </form>
    )
}