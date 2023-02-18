import React, { useState, useEffect } from 'react'
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
    createRequest,
    listMyRequests,
    deleteRequest,
} from '../actions/ngoRequestActions'
import NgoHeader from '../components/NgoHeader'

const NgoDashBoard = ({ history }) => {
    const [message, setMessage] = useState(null)
    const [request, setRequest] = useState(0)
    const [isActive, setActive] = useState(false)
    const [isOpen, setOpen] = useState(false)

    const dispatch = useDispatch()

    const ngoUserDetails = useSelector((state) => state.ngoUserDetails)
    const { loading, error, ngoUser } = ngoUserDetails

    const ngoUserLogin = useSelector((state) => state.ngoUserLogin)
    const { ngoUserInfo } = ngoUserLogin

    const ngoUserUpdateProfile = useSelector(
        (state) => state.ngoUserUpdateProfile
    )
    const { success } = ngoUserUpdateProfile

    const requestListMy = useSelector((state) => state.requestListMy)
    const {
        loading: loadingOrders,
        error: errorOrders,
        myrequests,
    } = requestListMy

    useEffect(() => {
        if (!ngoUserInfo) {
            history.push('/ngologin')
        } else {
            if (!ngoUser || !ngoUser.name || success) {
                dispatch(listMyRequests())
            }
        }
    }, [dispatch, history, ngoUserInfo, ngoUser, success])

    const createRequestHandler = (e) => {
        if (request === 0) {
            setMessage('Number not Valid')
        } else {
            dispatch(
                createRequest({
                    id: ngoUserInfo._id,
                    required: request,
                })
            )
        }
    }

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteRequest(id))
            window.location.reload(false)
        }
    }
    return (
        <Row>
            <NgoHeader
                active={isActive}
                setActive={setActive}
                open={isOpen}
                setOpen={setOpen}
            />
            <div
                className={`${isActive ? 'incHeight' : ''}`}
                style={{ width: '100%' }}
            >
                <Col className={`${isOpen ? 'incMoreHeight' : ''}`} md={9}>
                    <Row className='Request'>
                        <Col md={9}>
                            <h5 className='requestHeading'>Create Request</h5>
                            <Form onSubmit={createRequestHandler}>
                                <Form.Group controlId='name'>
                                    <Form.Label>Required Qty</Form.Label>
                                    <Form.Control
                                        type='number'
                                        placeholder='Enter required food for number of persons'
                                        value={request}
                                        onChange={(e) =>
                                            setRequest(e.target.value)
                                        }
                                    ></Form.Control>
                                </Form.Group>
                                <Button type='submit' variant='primary'>
                                    Create Request
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                    <Row style={{ width: '100%' }}>
                        <Col lg={12} style={{ width: '100%' }}>
                            <h5>My Requests</h5>
                            {loadingOrders ? (
                                <Loader />
                            ) : errorOrders ? (
                                <Message variant='danger'>
                                    {errorOrders}
                                </Message>
                            ) : myrequests.length > 0 ? (
                                <Table
                                    striped
                                    bordered
                                    hover
                                    responsive
                                    className='table-sm tble'
                                >
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>DATE</th>
                                            <th>Qty</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {myrequests
                                            .reverse()
                                            .map((myrequest) => (
                                                <tr key={myrequest._id}>
                                                    <td>{myrequest._id}</td>
                                                    <td>
                                                        {myrequest.createdAt.substring(
                                                            0,
                                                            10
                                                        )}
                                                    </td>
                                                    <td>
                                                        {myrequest.requiredQty}
                                                    </td>
                                                    <td>
                                                        <Button
                                                            variant='danger'
                                                            className='btn-sm'
                                                            onClick={() =>
                                                                deleteHandler(
                                                                    myrequest._id
                                                                )
                                                            }
                                                        >
                                                            <i className='fas fa-trash'></i>
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </Table>
                            ) : (
                                <>No request</>
                            )}
                        </Col>
                    </Row>
                </Col>
            </div>
        </Row>
    )
}

export default NgoDashBoard
