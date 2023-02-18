import React, { useEffect, useState } from 'react'
import { Table, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import ErrorPage from '../components/ErrorPage'
import { getNgoDonations } from '../actions/ngoUserActions'
import NgoHeader from '../components/NgoHeader'

const NgoMyDonationScreen = ({ history }) => {
    const [isActive, setActive] = useState(false)
    const [isOpen, setOpen] = useState(false)

    const dispatch = useDispatch()

    const ngoUserLogin = useSelector((state) => state.ngoUserLogin)
    const { ngoUserInfo } = ngoUserLogin
    const ngoDonations = useSelector((state) => state.ngoDonations)
    const {
        loading: loadingOrders,
        error: errorOrders,
        ngoDonation,
    } = ngoDonations

    useEffect(() => {
        if (!ngoUserInfo) {
            history.push('/ngologin')
        } else {
            dispatch(getNgoDonations())
        }
    }, [dispatch, history, ngoUserInfo])

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
                    <Row>
                        <Col md={10}>
                            <Row>
                                {loadingOrders ? (
                                    <Loader />
                                ) : errorOrders ? (
                                    <ErrorPage />
                                ) : (
                                    <>
                                        <h4>Received Donations</h4>
                                        <Table
                                            striped
                                            bordered
                                            hover
                                            responsive
                                            className='table-sm'
                                        >
                                            <thead>
                                                <tr>
                                                    <th>NAME</th>
                                                    <th>MOBILE NO.</th>
                                                    <th>EMAIL</th>
                                                    <th>Qty</th>
                                                    <th>Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {ngoDonation
                                                    ?.reverse()
                                                    .map((ngo) => (
                                                        <tr key={ngo._id}>
                                                            <td>{ngo.name}</td>
                                                            <td>
                                                                {ngo.mobileNo}
                                                            </td>
                                                            <td>{ngo.email}</td>
                                                            <td>{ngo.qty}</td>
                                                            <td>
                                                                {ngo?.date?.substring(
                                                                    0,
                                                                    10
                                                                )}
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
                </div>
            </div>
        </>
    )
}

export default NgoMyDonationScreen
