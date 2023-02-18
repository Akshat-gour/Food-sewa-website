import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userDonationsReducer,
    getUserDonationsReducer,
} from './reducers/userReducers'
import {
    ngoUserRegisterReducer,
    ngoUserLoginReducer,
    ngoUserUpdateProfileReducer,
    ngoUserDetailsReducer,
    ngoDetailsReducer,
    getNgoUserDonationsReducer,
    productReviewCreateReducer,
} from './reducers/ngoUserReducers'

import {
    ngoUserCreateRequestReducer,
    requestListReducer,
    myrequestListReducer,
    requestDeleteReducer,
} from './reducers/ngoRequestReducers'

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    ngoUserLogin: ngoUserLoginReducer,
    ngoUserRegister: ngoUserRegisterReducer,
    ngoUserRequest: ngoUserCreateRequestReducer,
    ngoUserUpdateProfile: ngoUserUpdateProfileReducer,
    ngoUserDetails: ngoUserDetailsReducer,
    requestList: requestListReducer,
    ngoDetails: ngoDetailsReducer,
    requestListMy: myrequestListReducer,
    requestDelete: requestDeleteReducer,
    userDonate: userDonationsReducer,
    myDonations: getUserDonationsReducer,
    ngoDonations: getNgoUserDonationsReducer,
    productReviewCreate: productReviewCreateReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null
const ngoUserInfoFromStorage = localStorage.getItem('ngoUserInfo')
    ? JSON.parse(localStorage.getItem('ngoUserInfo'))
    : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
    ngoUserLogin: { ngoUserInfo: ngoUserInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store
