import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/ngoUserActions'
import LandingHeader from '../components/LandingHeader'

const NgoRegisterScreen = ({ history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mobileNo, setMobileNo] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [image, setImage] = useState('')
    const [description, setDesciption] = useState('')
    const [message, setMessage] = useState(null)
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const ngoUserRegister = useSelector((state) => state.ngoUserRegister)
    const { loading, error, ngoUserInfo } = ngoUserRegister

    const redirect = '/dashboard'

    useEffect(() => {
        if (ngoUserInfo) {
            history.push(redirect)
        }
    }, [history, ngoUserInfo, redirect])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }

            const profileImage  = await axios.post('/userUpload', formData, config)
            const data = profileImage
            // console.log(data.data.data.profileImage)
            setImage(data.data.data.profileImage)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }
    const submitHandler = (e) => {
        e.preventDefault()
        if (mobileNo.length !== 10) {
            setMessage('Mobile Number not Valid')
        } else if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(
                register(name, email, mobileNo, description, image, password)
            )
        }
    }

    return (
        <>
            <LandingHeader />
            <FormContainer>
                <h3>Sign Up</h3>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='mobileNo'>
                        <Form.Label>Mobile No.</Form.Label>
                        <Form.Control
                            type='mobileNo'
                            placeholder='Enter Mobile No'
                            value={mobileNo}
                            onChange={(e) => setMobileNo(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <p></p>
                        <textarea
                            type='textArea'
                            placeholder='Enter Description'
                            value={description}
                            rows='5'
                            cols='68'
                            style={{ width: '100%' }}
                            onChange={(e) => setDesciption(e.target.value)}
                        ></textarea>
                    </Form.Group>
                    <Form.Group controlId='image'>
                        <Form.Label>Profile Image</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter image url'
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        ></Form.Control>
                        <Form.File
                            id='image-file'
                            label='Choose File'
                            custom
                            onChange={uploadFileHandler}
                        ></Form.File>
                        {uploading && <Loader />}
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

                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Confirm password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'>
                        Register
                    </Button>
                </Form>

                <Row className='py-3'>
                    <Col>
                        Have an Account?{' '}
                        <Link
                            to={
                                redirect
                                    ? `/ngologin?redirect=${redirect}`
                                    : '/ngologin'
                            }
                        >
                            Login
                        </Link>
                    </Col>
                </Row>
            </FormContainer>
        </>
    )
}

export default NgoRegisterScreen
