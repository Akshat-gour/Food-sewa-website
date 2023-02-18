import {
    NGO_USER_REQUIRED_REQUEST,
    NGO_USER_REQUIRED_SUCCESS,
    NGO_USER_REQUIRED_FAIL,
    NGO_USER_LOGOUT,
    REQUEST_LIST_REQUEST,
    REQUEST_LIST_SUCCESS,
    REQUEST_LIST_FAIL,
    MY_REQUEST_LIST_SUCCESS,
    MY_REQUEST_LIST_REQUEST,
    MY_REQUEST_LIST_FAIL,
    REQUEST_DELETE_FAIL,
    REQUEST_DELETE_SUCCESS,
    REQUEST_DELETE_REQUEST,
} from '../constants/ngoRequestConstants'

export const ngoUserCreateRequestReducer = (state = {}, action) => {
    switch (action.type) {
        case NGO_USER_REQUIRED_REQUEST:
            return { loading: true }
        case NGO_USER_REQUIRED_SUCCESS:
            return { loading: false }
        case NGO_USER_REQUIRED_FAIL:
            return { loading: false, error: action.payload }
        case NGO_USER_LOGOUT:
            return {}
        default:
            return state
    }
}
export const requestListReducer = (state = { requests: [] }, action) => {
    switch (action.type) {
        case REQUEST_LIST_REQUEST:
            return { loading: true, requests: [] }
        case REQUEST_LIST_SUCCESS:
            return {
                loading: false,
                requests: action.payload.requests,
                pages: action.payload.pages,
                page: action.payload.page,
            }
        case REQUEST_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const myrequestListReducer = (state = { myrequests: [] }, action) => {
    switch (action.type) {
        case MY_REQUEST_LIST_REQUEST:
            return { loading: true, myrequests: [] }
        case MY_REQUEST_LIST_SUCCESS:
            return {
                loading: false,
                myrequests: action.payload,
            }
        case MY_REQUEST_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const requestDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case REQUEST_DELETE_REQUEST:
            return { loading: true }
        case REQUEST_DELETE_SUCCESS:
            return { loading: false, success: true }
        case REQUEST_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
