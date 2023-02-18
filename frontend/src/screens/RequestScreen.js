import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'

import { GetngoDetails, createProductReview } from '../actions/ngoUserActions'
import { donate } from '../actions/userActions'

const RequestScreen = ({ history, match }) => {
    const [qty, setQty] = useState(0)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const ngoDetails = useSelector((state) => state.ngoDetails)
    const { loading, error, ngo } = ngoDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!ngo._id || ngo._id !== match.params.id) {
            dispatch(GetngoDetails(match.params.id))
        }
    }, [dispatch, match])

    const handlerDonate = () => {
        if (qty > 0) {
            const donation = {
                name: ngo.name,
                qty: qty,
                image: ngo.image,
                mobileNo: ngo.mobileNo,
                email: ngo.email,
                donatedTo: match.params.id,
            }
            dispatch(
                donate({
                    donations: donation,
                })
            )
            history.push(`/contact/${match.params.id}?qty=${qty}`)
        }
    }

    const productReviewCreate = useSelector(
        (state) => state.productReviewCreate
    )
    const {
        success: successProductReview,
        loading: loadingProductReview,
        error: errorProductReview,
    } = productReviewCreate

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
            createProductReview(match.params.id, {
                rating,
                comment,
            })
        )
    }
    return (
        <>
            <Link className='btn btn-light my-3' to='/home'>
                Go Back
            </Link>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Meta title={ngo.name} />
                    <Row>
                        <Col md={3}>
                            <Image src={ngo.image} alt={ngo.name} fluid />
                        </Col>
                        <Col md={6}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{ngo.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating
                                        value={ngo.rating}
                                        text={`${ngo.numReviews} reviews`}
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Meals Required: {match.params.Qty}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Description: {ngo.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Qty (Person)</Col>
                                            <Col>
                                                <Form
                                                    value={qty}
                                                    onChange={(e) =>
                                                        setQty(e.target.value)
                                                    }
                                                    autocomplete='off'
                                                >
                                                    <input
                                                        type='number'
                                                        name='hidden'
                                                        value={qty}
                                                        required
                                                        min='1'
                                                        autocomplete='false'
                                                    />
                                                </Form>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Button
                                            onClick={handlerDonate}
                                            className='btn-block'
                                            type='button'
                                        >
                                            Donate
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h2>Reviews</h2>
                            {ngo.reviews?.length === 0 && (
                                <Message>No Reviews</Message>
                            )}
                            <ListGroup variant='flush'>
                                {ngo.reviews?.map((review) => (
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} />
                                        <p>
                                            {review.createdAt.substring(0, 10)}
                                        </p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                                <ListGroup.Item>
                                    <h2>Write a Customer Review</h2>
                                    {successProductReview && (
                                        <Message variant='success'>
                                            Review submitted successfully
                                        </Message>
                                    )}
                                    {loadingProductReview && <Loader />}
                                    {errorProductReview && (
                                        <Message variant='danger'>
                                            {errorProductReview}
                                        </Message>
                                    )}
                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group controlId='rating'>
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control
                                                    as='select'
                                                    value={rating}
                                                    onChange={(e) =>
                                                        setRating(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value=''>
                                                        Select...
                                                    </option>
                                                    <option value='1'>
                                                        1 - Poor
                                                    </option>
                                                    <option value='2'>
                                                        2 - Fair
                                                    </option>
                                                    <option value='3'>
                                                        3 - Good
                                                    </option>
                                                    <option value='4'>
                                                        4 - Very Good
                                                    </option>
                                                    <option value='5'>
                                                        5 - Excellent
                                                    </option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId='comment'>
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control
                                                    as='textarea'
                                                    row='3'
                                                    value={comment}
                                                    onChange={(e) =>
                                                        setComment(
                                                            e.target.value
                                                        )
                                                    }
                                                ></Form.Control>
                                            </Form.Group>
                                            <Button
                                                disabled={loadingProductReview}
                                                type='submit'
                                                variant='primary'
                                            >
                                                Submit
                                            </Button>
                                        </Form>
                                    ) : (
                                        <Message>
                                            Please{' '}
                                            <Link to='/login'>sign in</Link> to
                                            write a review{' '}
                                        </Message>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )}
        </>
    )
}

export default RequestScreen
