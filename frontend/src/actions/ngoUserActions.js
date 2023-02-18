import axios from 'axios'
import {
    NGO_USER_LOGIN_FAIL,
    NGO_USER_LOGIN_REQUEST,
    NGO_USER_LOGIN_SUCCESS,
    NGO_USER_LOGOUT,
    NGO_USER_REGISTER_FAIL,
    NGO_USER_REGISTER_REQUEST,
    NGO_USER_REGISTER_SUCCESS,
    NGO_USER_UPDATE_PROFILE_REQUEST,
    NGO_USER_UPDATE_PROFILE_FAIL,
    NGO_USER_UPDATE_PROFILE_SUCCESS,
    NGO_USER_DETAILS_FAIL,
    NGO_USER_DETAILS_REQUEST,
    NGO_USER_DETAILS_SUCCESS,
    NGO_USER_DETAILS_RESET,
    GET_NGO_DETAILS_REQUEST,
    GET_NGO_DETAILS_SUCCESS,
    GET_NGO_DETAILS_FAIL,
    GET_NGO_USER_DONATE_FAIL,
    GET_NGO_USER_DONATE_SUCCESS,
    GET_NGO_USER_DONATE_REQUEST,
    NGO_CREATE_REVIEW_REQUEST,
    NGO_CREATE_REVIEW_SUCCESS,
    NGO_CREATE_REVIEW_FAIL,
} from '../constants/ngoUserConstants'

export const createProductReview =
    (productId, review) => async (dispatch, getState) => {
        try {
            dispatch({
                type: NGO_CREATE_REVIEW_REQUEST,
            })

            const {
                userLogin: { userInfo },
            } = getState()

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            }

            await axios.post(
                `https://food-sewa.onrender.com/api/ngoUser/${productId}/reviews`,
                review,
                config
            )

            dispatch({
                type: NGO_CREATE_REVIEW_SUCCESS,
            })
        } catch (error) {
            const message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            if (message === 'Not authorized, token failed') {
                dispatch(logout())
            }
            dispatch({
                type: NGO_CREATE_REVIEW_FAIL,
                payload: message,
            })
        }
    }

export const getNgoDonations = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_NGO_USER_DONATE_REQUEST,
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

        const { data } = await axios.get(`https://food-sewa.onrender.com/api/ngoUser/donations`, config)

        dispatch({
            type: GET_NGO_USER_DONATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: GET_NGO_USER_DONATE_FAIL,
            payload: message,
        })
    }
}

export const ngoGetUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: NGO_USER_DETAILS_REQUEST,
        })

        const {
            ngoUserLogin: { ngoUserInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${ngoUserInfo.token}`,
            },
        }

        const { data } = await axios.get(`https://food-sewa.onrender.com/api/ngoUser/${id}`, config)

        dispatch({
            type: NGO_USER_DETAILS_SUCCESS,
            payload: data,
        })
        localStorage.setItem('ngoUser', JSON.stringify(data))
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: NGO_USER_DETAILS_FAIL,
            payload: message,
        })
    }
}

export const GetngoDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_NGO_DETAILS_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data } = await axios.get(`https://food-sewa.onrender.com/api/ngoUser/${id}`, config)

        dispatch({
            type: GET_NGO_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: GET_NGO_DETAILS_FAIL,
            payload: message,
        })
    }
}

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: NGO_USER_LOGIN_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data } = await axios.post(
            'https://food-sewa.onrender.com/api/ngoUser/login',
            { email, password },
            config
        )

        dispatch({
            type: NGO_USER_LOGIN_SUCCESS,
            payload: data,
        })

        localStorage.setItem('ngoUserInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: NGO_USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('ngoUserInfo')
    dispatch({ type: NGO_USER_LOGOUT })
    dispatch({ type: NGO_USER_DETAILS_RESET })
    document.location.href = '/ngologin'
}

export const register =
    (name, email, mobileNo, description, image, password, location) =>
    async (dispatch) => {
        try {
            dispatch({
                type: NGO_USER_REGISTER_REQUEST,
            })

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            const { data } = await axios.post(
                'https://food-sewa.onrender.com/api/ngoUser',
                {
                    name,
                    email,
                    mobileNo,
                    description,
                    image,
                    password,
                    location,
                },
                config
            )

            dispatch({
                type: NGO_USER_REGISTER_SUCCESS,
                payload: data,
            })

            dispatch({
                type: NGO_USER_LOGIN_SUCCESS,
                payload: data,
            })

            localStorage.setItem('ngoUserInfo', JSON.stringify(data))
        } catch (error) {
            dispatch({
                type: NGO_USER_REGISTER_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            })
        }
    }
export const ngoUpdateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: NGO_USER_UPDATE_PROFILE_REQUEST,
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

        const { data } = await axios.put(`https://food-sewa.onrender.com/api/ngoUser/profile`, user, config)

        dispatch({
            type: NGO_USER_UPDATE_PROFILE_SUCCESS,
            payload: data,
        })
        dispatch({
            type: NGO_USER_LOGIN_SUCCESS,
            payload: data,
        })
        localStorage.setItem('ngoUserInfo', JSON.stringify(data))
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: NGO_USER_UPDATE_PROFILE_FAIL,
            payload: message,
        })
    }
}
