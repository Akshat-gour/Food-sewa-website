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
    NGO_USER_UPDATE_PROFILE_RESET,
    NGO_USER_DETAILS_FAIL,
    NGO_USER_DETAILS_REQUEST,
    NGO_USER_DETAILS_SUCCESS,
    NGO_USER_DETAILS_RESET,
    GET_NGO_DETAILS_REQUEST,
    GET_NGO_DETAILS_SUCCESS,
    GET_NGO_DETAILS_FAIL,
    GET_NGO_DETAILS_RESET,
    GET_NGO_USER_DONATE_FAIL,
    GET_NGO_USER_DONATE_SUCCESS,
    GET_NGO_USER_DONATE_REQUEST,
    GET_NGO_USER_DONATE_RESET,
    NGO_CREATE_REVIEW_REQUEST,
    NGO_CREATE_REVIEW_SUCCESS,
    NGO_CREATE_REVIEW_FAIL,
    NGO_CREATE_REVIEW_RESET,
} from '../constants/ngoUserConstants'

export const productReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case NGO_CREATE_REVIEW_REQUEST:
            return { loading: true }
        case NGO_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true }
        case NGO_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload }
        case NGO_CREATE_REVIEW_RESET:
            return {}
        default:
            return state
    }
}

export const ngoUserDetailsReducer = (state = { ngoUser: {} }, action) => {
    switch (action.type) {
        case NGO_USER_DETAILS_REQUEST:
            return { ...state, loading: true }
        case NGO_USER_DETAILS_SUCCESS:
            return { loading: false, ngoUser: action.payload }
        case NGO_USER_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        case NGO_USER_DETAILS_RESET:
            return { ngoUser: {} }
        default:
            return state
    }
}

export const ngoDetailsReducer = (state = { ngo: {} }, action) => {
    switch (action.type) {
        case GET_NGO_DETAILS_REQUEST:
            return { ...state, loading: true }
        case GET_NGO_DETAILS_SUCCESS:
            return { loading: false, ngo: action.payload }
        case GET_NGO_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        case GET_NGO_DETAILS_RESET:
            return { ngo: {} }
        default:
            return state
    }
}

export const ngoUserUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case NGO_USER_UPDATE_PROFILE_REQUEST:
            return { loading: true }
        case NGO_USER_UPDATE_PROFILE_SUCCESS:
            return {
                loading: false,
                success: true,
                ngoUserInfo: action.payload,
            }
        case NGO_USER_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload }
        case NGO_USER_UPDATE_PROFILE_RESET:
            return {}
        default:
            return state
    }
}

export const ngoUserLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case NGO_USER_LOGIN_REQUEST:
            return { loading: true }
        case NGO_USER_LOGIN_SUCCESS:
            return { loading: false, ngoUserInfo: action.payload }
        case NGO_USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case NGO_USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const ngoUserRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case NGO_USER_REGISTER_REQUEST:
            return { loading: true }
        case NGO_USER_REGISTER_SUCCESS:
            return { loading: false, ngoUserInfo: action.payload }
        case NGO_USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }
        case NGO_USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const getNgoUserDonationsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_NGO_USER_DONATE_REQUEST:
            return { loading: true }
        case GET_NGO_USER_DONATE_SUCCESS:
            return {
                loading: false,
                success: true,
                ngoDonation: action.payload,
            }
        case GET_NGO_USER_DONATE_FAIL:
            return { loading: false, error: action.payload }
        case GET_NGO_USER_DONATE_RESET:
            return {}
        default:
            return state
    }
}
