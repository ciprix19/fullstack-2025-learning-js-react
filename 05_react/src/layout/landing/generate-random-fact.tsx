import { use, useEffect, useState } from "react";
import { useFetchData } from "../../utils/useFetchData";


export default function GenerateRandomFact() {
    const fetched = useFetchData('https://uselessfacts.jsph.pl/api/v2/facts/random');
    const [randomFact, setRandomFact] = useState(null);

    // todo - add items in div
    useEffect(() => {
        if (fetched) setRandomFact(randomFact);
    });

    function handleButtonFact() {
        // const fetch = useFetchData('https://uselessfacts.jsph.pl/api/v2/facts/random');
        // setRandomFact(fetch);
    }

    return (
        <section>
            <div className='two-column-layout-bigger'>
                <button className='button-fact' onClick={() => handleButtonFact()}>Generate random fact!</button>
                <div className='fact'>
                    <h2></h2>
                    <p></p>
                    <a></a>
                </div>
            </div>
        </section>
    );
}