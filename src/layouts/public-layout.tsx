import { Outlet } from 'react-router'
import Footer from '../components/footer'
import Header from '@/components/header'
import AuthHandler from '@/handler/user-auth-handler'

const PublicLayout = () => {
  return (
    <div className='w-full '>
      <AuthHandler/>
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default PublicLayout