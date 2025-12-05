import { useEffect, useState } from "react";
import useFetchData from "../../utils/hooks/useFetchData";

type Fact = {
    id: string;
    language: string;
    permalink: string;
    source: string;
    source_url: string;
    text: string;
}

export default function GenerateRandomFact() {
    const fetched = useFetchData('https://uselessfacts.jsph.pl/api/v2/facts/random');
    const [randomFact, setRandomFact] = useState<Fact | null>(null);

    // todo - add items in div
    useEffect(() => {
        if (fetched) {
            setRandomFact(fetched);
        }
    }, [fetched]);

    function handleButtonFact() {
        localStorage.removeItem('theme');
        fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
            .then(response => response.json())
            .then(json => setRandomFact(json));
    }

    return (
        <section>
            <div className='two-column-layout-bigger'>
                <button className='button-fact' onClick={() => handleButtonFact()}>Generate random fact!</button>
                <div className='fact card'>
                    <h3>{randomFact?.text}</h3>
                    <label>{randomFact?.source}</label>
                    <br></br>
                    <a>{randomFact?.source_url}</a>
                </div>
            </div>
        </section>
    );
}