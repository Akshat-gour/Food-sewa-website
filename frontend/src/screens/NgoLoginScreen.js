import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/ngoUserActions'

import LandingHeader from '../components/LandingHeader'
const LoginScreen = ({ history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const ngoUserLogin = useSelector((state) => state.ngoUserLogin)
    const { loading, error, ngoUserInfo } = ngoUserLogin

    const redirect = '/dashboard'

    useEffect(() => {
        if (ngoUserInfo) {
            history.push(redirect)
        }
    }, [history, ngoUserInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <>
            <LandingHeader />
            <FormContainer>
                <h3>Sign In</h3>
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'>
                        Sign In
                    </Button>
                </Form>

                <Row className='py-3'>
                    <Col>
                        New Customer?{' '}
                        <Link
                            to={
                                redirect
                                    ? `/ngoregister?redirect=${redirect}`
                                    : '/ngoregister'
                            }
                        >
                            Register
                        </Link>
                    </Col>
                </Row>
            </FormContainer>
        </>
    )
}

export default LoginScreen
