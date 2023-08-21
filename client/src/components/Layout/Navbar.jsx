import React from 'react'
import { Link } from 'react-router-dom'
import { navItems } from '../../static/data'
import styles from '../../styles/styles'

const Navbar = ({active}) => {
  return (
    <div className={`flex mr-60 800px:${styles.noramlFlex}`}>
         {
            navItems && navItems.map((i,index) => (
                <div className="flex">
                    <Link to={i.url}
                    className={`${active === index + 1 ? "text-[#17dd1f]" : "text-black 800px:text-black"} pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer}`}
                    >
                    <span className={`${styles.normalFlex}`}>{i.icon}{i.title}</span>
                    </Link>
                </div>
            ))
         }
    </div>
  )
}

export default Navbar