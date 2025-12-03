import { useEffect, useState, type ChangeEvent } from 'react';
import useFetchData from '../../utils/useFetchData';

type Review = {
    id: number;
    name: string;
    role: string;
    photo: string;
    feedback: string;
    rating: number;
}

type Reviews = Review[];

let howManyReviews = 3;
export default function Testimonials() {
    const fetched = useFetchData('http://localhost:3000/testimonials');
    const [reviews, setReviews] = useState<Reviews>([]);
    const [currentReviewIndex, setCurrentReviewIndex] = useState<number>(0);

    useEffect(() => {
        if (fetched) {
            setReviews(fetched.reviews);
        }
    }, [fetched]);

    function handleLeftArrow() {
        if (currentReviewIndex - howManyReviews < 0) {
            if (reviews.length % howManyReviews === 0) {
                setCurrentReviewIndex(reviews.length - howManyReviews);
            } else {
                setCurrentReviewIndex(reviews.length - (reviews.length % howManyReviews));
            }
        } else {
            setCurrentReviewIndex(currentReviewIndex - howManyReviews);
        }
    }

    function handleRightArrow() {
        if (currentReviewIndex + howManyReviews >= reviews.length) {
            setCurrentReviewIndex(0)
        } else {
            setCurrentReviewIndex(currentReviewIndex + howManyReviews);
        }
    }


    function handleSortReviews(e: ChangeEvent<HTMLSelectElement>) {
        const result = [...reviews];
        switch (e.target.value) {
            case 'ID' :
                setReviews(result.sort((a: Review, b: Review) => a.id - b.id));
                break;
            case 'Name' :
                setReviews(result.sort((a: Review, b: Review) => a.name.localeCompare(b.name)));
                break;
            case 'Role' :
                setReviews(result.sort((a: Review, b: Review) => a.role.localeCompare(b.role)));
                break;
            case 'Rating' :
                setReviews(result.sort((a: Review, b: Review) => b.rating - a.rating));
                break;
        }
    }

    return (
        <>
            <section>
                <h2>Customer Feedback</h2>
                <label>Sort by: </label>
                <select id='sort-select' onChange={e => handleSortReviews(e)}>
                    <option>ID</option>
                    <option>Name</option>
                    <option>Role</option>
                    <option>Rating</option>
                </select>
                <div className='reviews'>
                    {reviews.slice(currentReviewIndex, currentReviewIndex + howManyReviews).map(r => {
                        return (
                            <div key={r.id} className='card feedback-card three-column-layout'>
                                <img src={`images/${r.photo}`} alt={`Profile picture of user: ${r.name}`}></img>
                                <div>
                                    <h4 className={r.name.length % 2 === 0 ? 'highlight-even' : ''}>{r.name}, {r.role}</h4>
                                    <p>{r.feedback}</p>
                                </div>
                                <h2>{r.rating}⭐</h2>
                            </div>
                        );
                    })}
                </div>
                <div className='pagination'>
                    <button className='arrow' id='left-arrow' onClick={handleLeftArrow}>⇦</button>
                    <button className='arrow' id='right-arrow' onClick={handleRightArrow}>⇨</button>
                </div>
            </section>
            <section>
                <div>
                    <h2>Leave some feedback!</h2>
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