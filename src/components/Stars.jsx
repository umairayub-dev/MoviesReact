import React, { useState } from 'react'
import cx from 'classnames'
const Stars = ({ value, setRating }) => {
    const [hover, setHover] = useState(value);

    return (
        <div className="star-rating">
            {[...Array(5)].map((_, index) => {
                index += 1;
                return (
                    <span
                        key={index}
                        className={cx('p-1 cursor-pointer', { 'star-filled': index <= (hover || value) })}
                        onClick={() => setRating(index)}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(value)}
                    >
                        <span className="star">&#9733;</span>
                    </span>
                );
            })}
        </div>
    );
}

export default Stars