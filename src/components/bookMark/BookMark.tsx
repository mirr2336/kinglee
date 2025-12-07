import CommonHeader from '../header/CommonHeader'
import { useState, useEffect } from 'react'
import BookCard from './bookcard/BookCard'
import styles from './Bookmark.module.scss'
import type { CardDTO } from '@/components/card/types/card'

function Bookmark() {
    const STORAGE_VALUE = localStorage.getItem('bookmark');
    const [data, setData] = useState([])
    const getData = () => {
        if (STORAGE_VALUE !== null) {
            const getLocalStoage = JSON.parse(STORAGE_VALUE);
            //const getLocalStoage = JSON.parse(localStorage.getItem('bookmark'))

            if (getLocalStoage || getLocalStoage !== null) setData(getLocalStoage)
            else setData([])
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className={styles.page}>
            {/* 공통 UI 부분 */}
            <CommonHeader />
            <main className={styles.page__contents}>
                {/* 만약 데이터가 없을 때  */}
                {data.length === 0 ?
                    <div className={styles.page_contents_noData}>조회 가능한 데이터가 없습니다.</div>
                    : data.map((item: CardDTO) => { return <BookCard prop={item} key={item.id} /> })
                }
            </main>
        </div>
    )
}

export default Bookmark
