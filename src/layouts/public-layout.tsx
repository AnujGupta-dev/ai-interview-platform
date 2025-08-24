import Header from '../components/header'
import { Outlet } from 'react-router'
import Footer from '../components/footer'

const PublicLayout = () => {
  return (
    <div className='w-full '>
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default PublicLayout