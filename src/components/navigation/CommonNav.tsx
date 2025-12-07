import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './CommonNav.module.scss'
import navJson from './nav.json'

interface Navigation {
    index: number
    path: string
    label: string
    searchValue: string
    isActive: boolean
}

function CommonNav() {
    const location = useLocation()
    const [navigation, setNavigation] = useState<Navigation[]>(navJson)

    useEffect(() => {
        navigation.forEach((nav: Navigation) => {
            nav.isActive = false

            if (nav.path === location.pathname || location.pathname.includes(nav.path)) {
                nav.isActive = true
            }
        })
        setNavigation([...navigation])
    }, [location.pathname])

    // useState로 선언한 반응성을 가진 데이터를 기반으로 UI를 반복호출해보도록 한다.
    const navLinks = navigation.map((item: Navigation) => {
        return (
            <Link to={item.path} className={item.isActive ? `${styles.navigation__menu} ${styles.active}` : `${styles.navigation__menu} ${styles.inactive}`} key={item.path}>
                <span className={styles.navigation__menu__label}>{item.label}</span>
            </Link>
        )
    })
    return <nav className={styles.navigation}>{navLinks}</nav>
}

export default CommonNav