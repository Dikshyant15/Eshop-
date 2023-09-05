import React,{useState} from 'react'
import Header from '../components/Layout/Header'
import ProfileSidebar from '../components/Profile/ProfileSidebar'
import styles from '../styles/styles'

const ProfilePage = () => {
    const [active, setActive] = useState(1);
    return (
        <div>
            <Header />
            <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
                <div className="w-[50px] 800px:w-[335px] sticky 800px:mt-16 mt-[18%]">
                <ProfileSidebar  active={active} setActive={setActive}  />
                </div>
            </div>
        </div>
    )
}

export default ProfilePage