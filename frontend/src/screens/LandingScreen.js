import React from 'react'
import { Button } from 'react-bootstrap'
import LandingHeader from '../components/LandingHeader'
import TINY from '../images/TINY.JPG'
const LandingScreen = ({ history }) => {
    const homeHandler = () => {
        history.push(`/home`)
    }
    const DashboardHandler = () => {
        history.push(`/dashboard`)
    }
    return (
        <>
            <LandingHeader />
            <div className='Contain'>
                <div className='Container1'>
                    <p className='text'>
                        Today, 690 million people around the world will go to
                        bed on an empty stomach. But your gift means that one
                        less child will be at risk of starvation tonight.
                    </p>
                    <p className='text'>
                        Whether you decide to make a one-off donation or set up
                        a monthly gift, you can change a life forever today.
                        Often, one meal at the right time will be enough to make
                        a difference between life and death.
                    </p>
                    <div className='button'>
                        <Button
                            className='btn1'
                            type='submit'
                            variant='outline-primary'
                            onClick={DashboardHandler}
                        >
                            Get Food
                        </Button>
                        <Button
                            className='btn2'
                            type='submit'
                            variant='outline-primary'
                            onClick={homeHandler}
                        >
                            Donate Now
                        </Button>
                    </div>
                </div>
                <div className='Container2'>
                    <img className='image' src={TINY} alt='image' />
                </div>
            </div>
        </>
    )
}

export default LandingScreen
