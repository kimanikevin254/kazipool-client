'use client'

import store from '../redux/store'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify';

export default function Providers({ children }){
    return <Provider store={store}>
        {children}
        <ToastContainer />
    </Provider>
}