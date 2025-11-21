

export default function Testimonials() {
    return (
        <>
            <section>
                <h3>Customer Feedback</h3>
                <div className='reviews'></div>
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