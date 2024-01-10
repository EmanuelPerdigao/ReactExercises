import { useState, useEffect } from 'react';

export default function Dictionary() {
    const [word, setWord] = useState();
    const [word2, setWord2] = useState();

    useEffect(()=>{
        console.log("State updated:",word);
    },[word]);


    return (
        <>
            <input type="text" onChange={(e)=>{
                setWord(e.target.value);
            }}>
            </input>
            <h1>Lets get the definition for {word} </h1>


            <input type="text" onChange={(e)=>{
                setWord2(e.target.value);
            }}>
            </input>
            <h1>Lets get the definition for {word2} </h1>

            
        </>
    )
}