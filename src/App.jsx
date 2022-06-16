import { Button } from 'antd';
import { Outlet } from 'react-router-dom';

export default function App(){
    return(
        <div>
            <Button type="primary">Button</Button>
            <Outlet></Outlet>
        </div>
    )
}