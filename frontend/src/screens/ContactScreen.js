import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'

import { GetngoDetails } from '../actions/ngoUserActions'

const ContactScreen = ({ match, history }) => {
    const dispatch = useDispatch()

    const ngoDetails = useSelector((state) => state.ngoDetails)
    const { loading, error, ngo } = ngoDetails

    useEffect(() => {
        if (!ngo._id || ngo._id !== match.params.id) {
            dispatch(GetngoDetails(match.params.id))
        }
    }, [dispatch, match])

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
                    <Message variant='success'>
                        Successfully Send Notification about Donation to{' '}
                        <span style={{ fontWeight: 'bold' }}>{ngo.name}</span>
                    </Message>
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
                            </ListGroup>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h5>Contact Details : {ngo.mobileNo}</h5>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )}
        </>
    )
}

export default ContactScreen
