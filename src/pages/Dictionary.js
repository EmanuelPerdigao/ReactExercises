import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dictionary() {
    const [word, setWord] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        //console.log("State updated:",word);
    }, [word]);


    return (
        <>
            <input type="text" onChange={(e) => {
                setWord(e.target.value);
            }}>
            </input>
            <button onClick={()=>{
                navigate('/definition/'+ word);
            }}>Click Here</button>

        </>
    )
}