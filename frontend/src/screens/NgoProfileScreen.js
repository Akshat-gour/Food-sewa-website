import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
    ngoGetUserDetails,
    ngoUpdateUserProfile,
} from '../actions/ngoUserActions'

import axios from 'axios'
import FormContainer from '../components/FormContainer'

import NgoHeader from '../components/NgoHeader'
const NgoProfileScreen = ({ history }) => {
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

    useEffect(() => {
        if (!ngoUserInfo) {
            history.push('/ngologin')
        } else {
            if (ngoUserInfo || ngoUserInfo.name || success) {
                setName(ngoUserInfo.name)
                setEmail(ngoUserInfo.email)
                setMobileNo(ngoUserInfo.mobileNo)
            }
            if (!ngoUser || !ngoUser.name || success) {
                dispatch(ngoGetUserDetails('profile'))
            } else {
                setName(ngoUser.name)
                setEmail(ngoUser.email)
                setDesciption(ngoUser?.description)
            }
        }
    }, [dispatch, history, ngoUserInfo, ngoUser])

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mobileNo, setMobileNo] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [image, setImage] = useState('')
    const [description, setDesciption] = useState('')
    const [message, setMessage] = useState(null)
    const [uploading, setUploading] = useState(false)

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
        }
    }
    const submitHandler = (e) => {
        // e.preventDefault()
        if (mobileNo.length !== 10) {
            setMessage('Mobile Number not Valid')
        } else if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(
                ngoUpdateUserProfile({
                    id: ngoUserInfo._id,
                    name,
                    email,
                    mobileNo,
                    image,
                    description,
                    password,
                })
            )
            setPassword('')
            setConfirmPassword('')
            // history.push('/dashboard')
        }
    }
    return (
        <>
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
                <div className={`${isOpen ? 'incMHeight' : ''}`}>
                    <FormContainer>
                        <h4>User Profile</h4>
                        {message && (
                            <Message variant='danger'>{message}</Message>
                        )}
                        {}
                        {success && (
                            <Message variant='success'>Profile Updated</Message>
                        )}
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
                                    onChange={(e) =>
                                        setMobileNo(e.target.value)
                                    }
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
                                    onChange={(e) =>
                                        setDesciption(e.target.value)
                                    }
                                ></textarea>
                            </Form.Group>
                            <Form.Group controlId='image'>
                                <Form.Label>Profile Image</Form.Label>
                                <Form.Control type="file" id='image-file' onChange={uploadFileHandler}>
                                </Form.Control>
                                {uploading && <Loader />}
                            </Form.Group>
                            <Form.Group controlId='password'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Enter password'
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='confirmPassword'>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Confirm password'
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                ></Form.Control>
                            </Form.Group>

                            <Button type='submit' variant='primary'>
                                Update
                            </Button>
                        </Form>
                    </FormContainer>
                </div>
            </div>
        </>
    )
}

export default NgoProfileScreen
