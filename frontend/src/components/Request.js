import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Request = ({ request }) => {
    return (
        <Card className='cards my-3 p-3 rounded' style={{ height: '22rem' }}>
            <div
                style={{
                    height: '70%',
                    overflow: 'hidden',
                }}
            >
                <Link
                    to={`/request/${request._id}/${request.requestId}/${request.requiredQty}`}
                >
                    <Card.Img
                        className='imgheight'
                        src={request.image}
                        variant='top'
                    />
                </Link>
            </div>
            <div>
                <Card.Body className='cardBody'>
                    <Link
                        to={`/request/${request._id}/${request.requestId}/${request.requiredQty}`}
                    >
                        <Card.Title as='div'>
                            <strong>{request.name}</strong>
                        </Card.Title>
                    </Link>

                    <Card.Text as='div'>
                        <Rating
                            value={request.rating}
                            text={`${
                                request.numReviews ? 0 : request.rating
                            } reviews`}
                        />
                    </Card.Text>

                    <Card.Text as='h6'>
                        meals required: {request.requiredQty}
                    </Card.Text>
                </Card.Body>
            </div>
        </Card>
    )
}

export default Request
