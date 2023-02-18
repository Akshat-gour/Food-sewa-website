import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Container } from 'react-bootstrap'

const LandingHeader = () => {
    return (
        <header className='ngoheader' style={{ width: '100%' }}>
            <Navbar bg='dark' variant='dark' expand='lg'>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>Food Sewa</Navbar.Brand>
                    </LinkContainer>
                </Container>
            </Navbar>
        </header>
    )
}

export default LandingHeader
