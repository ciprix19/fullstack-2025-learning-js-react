import { useEffect, useState } from 'react';

type Review = {
    id: number;
    name: string;
    role: string;
    photo: string;
    feedback: string;
    rating: number;
}

type Reviews = Review[];

export default function Testimonials() {
    const [reviews, setReviews] = useState<Reviews>([]);

    useEffect(() => {
        let ignore = false;
        async function startFetching() {
            const res = await fetch('/database/reviews.json');
            if (!ignore) {
                const json = await res.json();
                console.log(json);
                console.log(typeof(json));
                setReviews(json.reviews);
            }
        }
        startFetching();
        return () => {
            ignore = true;
        }
    }, [])

    return (
        <>
            <section>
                <h3>Customer Feedback</h3>
                <div className='reviews'>
                    {reviews.map(r => {
                        return (
                            <div key={r.id} className='card feedback-card three-column-layout'>
                                <img src={r.photo} alt={`Profile picture of user: ${r.name}`}></img>
                                <div>
                                    <h4>{r.name}, {r.role}</h4>
                                    <p>{r.feedback}</p>
                                </div>
                                <h3>{r.rating}⭐</h3>
                            </div>
                        );
                    })}
                </div>
                <div className='pagination'>
                    <button className='arrow' id='left-arrow'>⇦</button>
                    <button className='arrow' id='right-arrow'>⇨</button>
                </div>
            </section>
            <section>
                <div>
                    <h3>Leave some feedback!</h3>
                    <textarea className='text-area'></textarea>
                    <div className='rating-div'>
                        <p>Rating: </p>
                        <input className='input-rating' type='number' min='0' max='5'></input>
                        <button type='submit' className='submit-button'>Submit!</button>
                    </div>
                </div>
            </section>
        </>
    );
}