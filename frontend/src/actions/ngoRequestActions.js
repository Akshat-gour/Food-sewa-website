import axios from 'axios'
import {
    NGO_USER_REQUIRED_REQUEST,
    NGO_USER_REQUIRED_SUCCESS,
    NGO_USER_REQUIRED_FAIL,
    NGO_USER_LOGOUT,
    REQUEST_LIST_REQUEST,
    REQUEST_LIST_SUCCESS,
    REQUEST_LIST_FAIL,
    MY_REQUEST_LIST_REQUEST,
    MY_REQUEST_LIST_SUCCESS,
    MY_REQUEST_LIST_FAIL,
    REQUEST_DELETE_FAIL,
    REQUEST_DELETE_SUCCESS,
    REQUEST_DELETE_REQUEST,
} from '../constants/ngoRequestConstants'

export const createRequest = (requiredQty) => async (dispatch, getState) => {
    try {
        dispatch({
            type: NGO_USER_REQUIRED_REQUEST,
        })

        const {
            ngoUserLogin: { ngoUserInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${ngoUserInfo.token}`,
            },
        }

        const { data } = await axios.post('https://food-sewa.onrender.com/api/request', requiredQty, config)

        dispatch({
            type: NGO_USER_REQUIRED_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: NGO_USER_REQUIRED_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const listRequests =
    (keyword = '', pageNumber = '') =>
    async (dispatch) => {
        try {
            dispatch({ type: REQUEST_LIST_REQUEST })

            const { data } = await axios.get(
                `https://food-sewa.onrender.com/api/request?keyword=${keyword}&pageNumber=${pageNumber}`
            )
            dispatch({
                type: REQUEST_LIST_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: REQUEST_LIST_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            })
        }
    }

export const listMyRequests = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: MY_REQUEST_LIST_REQUEST,
        })

        const {
            ngoUserLogin: { ngoUserInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${ngoUserInfo.token}`,
            },
        }

        const { data } = await axios.get(`https://food-sewa.onrender.com/api/request/myrequests`, config)

        dispatch({
            type: MY_REQUEST_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            // dispatch(logout())
        }
        dispatch({
            type: MY_REQUEST_LIST_FAIL,
            payload: message,
        })
    }
}

export const deleteRequest = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: REQUEST_DELETE_REQUEST,
        })

        const {
            ngoUserLogin: { ngoUserInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${ngoUserInfo.token}`,
            },
        }

        await axios.delete(`https://food-sewa.onrender.com/api/request/${id}`, config)

        dispatch({
            type: REQUEST_DELETE_SUCCESS,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            // dispatch(logout())
        }
        dispatch({
            type: REQUEST_DELETE_FAIL,
            payload: message,
        })
    }
}
