/*
App --- list
        edit
        data

register
login

*/

import App from '../App'
import List from '../pages/List'
import Edit from '../pages/Edit'
import DataManage from '../pages/DataManage'
import Login from '../pages/Login'   
import Register from '../pages/Register'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

const  BaseRouter = () =>(
    <Router>
        <Routes>
            <Route path='/' element={<App/>}>
                <Route path='/list' element={<List/>}></Route>
                <Route path='/edit' element={<Edit/>}></Route>
                <Route path='/datamanage' element={<DataManage/>}></Route>
            </Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
        </Routes>
    </Router>
)

export default BaseRouter;