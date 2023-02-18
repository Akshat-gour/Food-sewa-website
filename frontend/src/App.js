import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import NgoLoginScreen from './screens/NgoLoginScreen'
import NgoRegisterScreen from './screens/NgoRegisterScreen'
import NgoDashBoard from './screens/NgoDashBoard'
import RequestScreen from './screens/RequestScreen'
import NgoProfileScreen from './screens/NgoProfileScreen'
import ProfileScreen from './screens/ProfileScreen'
import ContactScreen from './screens/ContactScreen'
import MyDonationScreen from './screens/MyDonationScreen'
import NgoMyDonationScreen from './screens/NgoMyDonationScreen'
import LandingScreen from './screens/LandingScreen'

const App = () => {
    return (
        <Router>
            <Header />
            <main className='py-3'>
                <Container className='box'>
                    <Route path='/contact/:id?' component={ContactScreen} />
                    <Route path='/myDonations' component={MyDonationScreen} />
                    <Route
                        path='/ngodonations'
                        component={NgoMyDonationScreen}
                    />
                    <Route path='/login' component={LoginScreen} />
                    <Route path='/register' component={RegisterScreen} />
                    <Route path='/dashboard' component={NgoDashBoard} />
                    <Route path='/ngologin' component={NgoLoginScreen} />
                    <Route path='/ngoregister' component={NgoRegisterScreen} />
                    <Route path='/ngoprofile' component={NgoProfileScreen} />
                    <Route path='/profile' component={ProfileScreen} />
                    <Route
                        path='/page/:pageNumber'
                        component={HomeScreen}
                        exact
                    />
                    <Route path='/home' component={HomeScreen} exact />
                    <Route path='/' component={LandingScreen} exact />
                    <Route
                        path='/request/:id/:requestId/:Qty'
                        component={RequestScreen}
                    />
                </Container>
            </main>
            <Footer />
        </Router>
    )
}

export default App
