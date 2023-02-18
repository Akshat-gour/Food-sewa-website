import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/ngoUserActions'

const NgoHeader = (props) => {
    const dispatch = useDispatch()

    const ngoUserLogin = useSelector((state) => state.ngoUserLogin)
    const { ngoUserInfo } = ngoUserLogin

    const logoutHandler = () => {
        dispatch(logout())
    }
    const handleToggle = () => {
        const tmp = props.active
        props.setActive(!tmp)
        if (props.active) {
            const tmp = props.open
            props.setOpen(false)
        }
    }

    const handleClick = () => {
        if (props.active) {
            const tmp = props.open
            props.setOpen(!tmp)
        }
    }

    return (
        <header className='ngoheader' style={{ width: '100%' }}>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to='/dashboard'>
                        <Navbar.Brand>Food Sewa</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle
                        onClick={handleToggle}
                        aria-controls='basic-navbar-nav'
                    />
                    <Navbar.Collapse
                        id='basic-navbar-nav'
                        onClick={handleClick}
                    >
                        <Nav className='ml-auto'>
                            {ngoUserInfo ? (
                                <NavDropdown
                                    title={ngoUserInfo.name}
                                    id='username'
                                >
                                    <LinkContainer to='/ngoprofile'>
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/ngodonations'>
                                        <NavDropdown.Item>
                                            Received Donations
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to='/ngologin'>
                                    <Nav.Link>
                                        <i className='fas fa-user'></i> Sign In
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default NgoHeader
