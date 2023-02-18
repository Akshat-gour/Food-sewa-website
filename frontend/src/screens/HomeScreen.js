import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Request from '../components/Request'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'
import { listRequests } from '../actions/ngoRequestActions'

const HomeScreen = ({ history, match }) => {
    const keyword = match.params.keyword

    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const requestList = useSelector((state) => state.requestList)
    const { loading, error, requests, page, pages } = requestList

    useEffect(() => {
        dispatch(listRequests(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
    }, [dispatch, history, userInfo])

    return (
        <>
            <Meta />
            <h5>Food Required</h5>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Row>
                        {requests.reverse().map((request) => (
                            <Col key={request._id} sm={12} md={6} lg={4} xl={3}>
                                <Request request={request} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate
                        pages={pages}
                        page={page}
                        keyword={keyword ? keyword : ''}
                    />
                </>
            )}
        </>
    )
}

export default HomeScreen
