import React, { useEffect } from 'react'
import { Table, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { getDonations } from '../actions/userActions'
import ErrorPage from '../components/ErrorPage'

const MyDonationScreen = ({ history }) => {
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const mydonations = useSelector((state) => state.myDonations)
    const { loading: loadingOrders, error: errorOrders, donate } = mydonations

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            dispatch(getDonations())
        }
    }, [dispatch, history, userInfo])

    return (
        <Row className='container_donation'>
            <Col sm={12} md={10}>
                <Row>
                    {loadingOrders ? (
                        <Loader />
                    ) : errorOrders ? (
                        <ErrorPage />
                    ) : (
                        <>
                            <h4>My Donations</h4>
                            <Table
                                striped
                                bordered
                                hover
                                responsive
                                className='table-sm'
                            >
                                <thead>
                                    <tr>
                                        <th>Org. NAME</th>
                                        <th>MOBILE NO.</th>
                                        <th>EMAIL</th>
                                        <th>Qty Donated</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {donate?.donations?.map((ngo) => (
                                        <tr key={ngo._id}>
                                            <td>{ngo.name}</td>
                                            <td>{ngo.mobileNo}</td>
                                            <td>{ngo.email}</td>
                                            <td>{ngo.qty}</td>
                                            <td>
                                                {ngo?.date?.substring(0, 10)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </>
                    )}
                </Row>
            </Col>
        </Row>
    )
}

export default MyDonationScreen
