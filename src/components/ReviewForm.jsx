import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Stars from './Stars';

const ReviewForm = ({ onSubmit }) => {
    const [rating, setRating] = useState(1);
    const [review, setReview] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ rating, review });
        setRating(1);
        setReview('');
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formRating" className='mt-2'>
                <Form.Label>Rating</Form.Label>
                <Stars
                    count={5}
                    setRating={setRating}
                    size={54}
                    value={rating}
                    activeColor="#ffd700"/>
            </Form.Group>

            <Form.Group controlId="formReview" className='mt-2'>
                <Form.Label>Review</Form.Label>
                <Form.Control
                    as="textarea"
                    placeholder="Enter your review"
                    rows={3}
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />
            </Form.Group>

            <Button className='mt-3 bg-green' variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default ReviewForm;