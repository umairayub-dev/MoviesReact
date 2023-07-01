import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const FilterModal = ({
    showModal,
    handleModalClose,
    filters,
    handleFilterChange,
    applyFilters,
    handleClearFilters
}) => {

    const genres = [
        'Action',
        'Adventure',
        'Animation',
        'Biography',
        'Comedy',
        'Crime',
        'Documentary',
        'Drama',
        'Family',
        'Fantasy',
        'Film-Noir',
        'History',
        'Horror',
        'Music',
        'Musical',
        'Mystery',
        'Romance',
        'Sci-Fi',
        'Sport',
        'Thriller',
        'War',
        'Western'
    ];
    return (
        <Modal show={showModal} onHide={handleModalClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered bg="dark" data-bs-theme="dark" dialogClassName="custom-modal" >
            <Modal.Header closeButton>
                <Modal.Title>Filter Options</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="qualityFilter" className="my-3">
                        <Form.Label className="text-white">Quality:</Form.Label>
                        <Form.Control
                            as="select"
                            name="quality"
                            value={filters.quality || ''}
                            onChange={handleFilterChange}
                        >
                            <option value="">All</option>
                            <option value="720p">720p</option>
                            <option value="1080p">1080p</option>
                            <option value="2160p">2160p</option>
                            <option value="3D">3D</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="minimumRatingFilter" className="my-3">
                        <Form.Label className="text-white">Minimum Rating:</Form.Label>
                        <Form.Control
                            type="number"
                            min="0"
                            max="9"
                            name="minimum_rating"
                            value={filters.minimum_rating || 0}
                            onChange={handleFilterChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="genre">
                        <Form.Label>Genre</Form.Label>
                        <Form.Control
                            as="select"
                            name="genre"
                            value={filters.genre}
                            onChange={handleFilterChange}
                        >
                            <option value="">All</option>
                            {genres.map((genre, index) => (
                                <option key={index} value={genre}>
                                    {genre}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="sortByFilter" className="my-3">
                        <Form.Label className="text-white">Sort By:</Form.Label>
                        <Form.Control
                            as="select"
                            name="sort_by"
                            value={filters.sort_by}
                            onChange={handleFilterChange}
                        >
                            <option value="title">Title</option>
                            <option value="year">Year</option>
                            <option value="rating">Rating</option>
                            <option value="peers">Peers</option>
                            <option value="seeds">Seeds</option>
                            <option value="download_count">Download Count</option>
                            <option value="like_count">Like Count</option>
                            <option value="date_added">Date Added</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="orderByFilter" className="my-3">
                        <Form.Label className="text-white">Order By:</Form.Label>
                        <Form.Control
                            as="select"
                            name="order_by"
                            value={filters.order_by}
                            onChange={handleFilterChange}
                        >
                            <option value="desc">Descending</option>
                            <option value="asc">Ascending</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleModalClose}>
                    Close
                </Button>
                <Button variant="secondary" onClick={handleClearFilters}>
                    Clear Filters
                </Button>
                <Button variant="primary" className='text-dark' onClick={applyFilters}>
                    Apply Filters
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default FilterModal;
