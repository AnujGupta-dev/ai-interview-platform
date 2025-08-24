import { Outlet } from 'react-router'

const AuthenticaionLayout = () => {
  return (
    <div className='w-full'>
        <Outlet/>
    </div>
  )
}

export default AuthenticaionLayout