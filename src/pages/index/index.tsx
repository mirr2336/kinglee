//import axios from 'axios'
import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import CommonHeader from '@/components/header/CommonHeader'
import CommonSearchBar from '@/components/searchBar/CommonSearchBar'
import CommonNav from '@/components/navigation/CommonNav'
import CommonFooter from '@/components/footer/CommonFooter'
import Card from '@/components/card/Card'
import { useDataSelector } from '@/stores/dataSelector'
import DetailDialog from '@/components/dialog/DetailDialog'
import type { CardDTO } from '@/components/card/types/card'

function index() {

    const imgUrls = useDataSelector((state) => state.imgUrls)
    const fetchData = useDataSelector((state) => state.fetchData)  
    const [open, setOpen] = useState<boolean>(false)
    const [imgData, setImgData] = useState<CardDTO>()

    useEffect(() => {
        fetchData()
    }, [])

    const cardList = imgUrls.map((card: CardDTO) => {
        return <Card key={card.id} data={card} handleDialog={setOpen} handleSetData={setImgData} />
    })

    return (
        <div className={styles.page}>
            {/* 공통 헤더 UI 부분 */}
            <CommonHeader />
            {/* 공통 네비게이션 UI 부분 */}
            <CommonNav />
            <div className={styles.page__contents}>
                <div className={styles.page__contents__introBox}>
                    <div className={styles.wrapper}>
                        <span className={styles.wrapper__title}>PhotoSplash</span>
                        <span className={styles.wrapper__desc}>
                            인터넷의 시각 자료 출처입니다. <br />
                            모든 지역에 있는 크리에이터들의 지원을 받습니다.
                        </span>
                        {/* 검색창 UI 부분 */}
                        <CommonSearchBar />
                    </div>
                </div>
                <div className={styles.page__contents__imageBox}>
                    {cardList}
                </div>
            </div>
            {/* 공통 푸터 UI 부분 */}
            <CommonFooter />
            {open && imgData && <DetailDialog data={imgData} handleDialog={setOpen} />}
        </div>
    )
}

export default index