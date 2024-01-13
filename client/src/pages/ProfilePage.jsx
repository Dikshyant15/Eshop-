import React,{useState} from 'react'
import Header from '../components/Layout/Header'
import ProfileSidebar from '../components/Profile/ProfileSidebar'
import styles from '../styles/styles'
import ProfileContent from '../components/Profile/ProfileContent'
import { useSelector } from 'react-redux'

const ProfilePage = () => {
    const [active, setActive] = useState(1);
    const { loading,isAuthenticated } = useSelector((state) => state.user);
    console.log(isAuthenticated)
    return (
        <div>
            <Header />
            <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
                <div className="w-[50px] 800px:w-[335px] sticky 800px:mt-16 mt-[18%]">
                <ProfileSidebar  active={active} setActive={setActive}  />
                </div>
                <ProfileContent active = {active}/>
            </div>
        </div>
    )
}

export default ProfilePage