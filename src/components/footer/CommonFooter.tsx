import { useState } from 'react'
import styles from './CommonFooter.module.scss'
import { usePageState } from '@/stores/pageState'
import { useDataSelector } from '@/stores/dataSelector'

function CommonFooter() {

    const pageState = usePageState.getState().pageState;
    const setPageState = usePageState.getState().setPageState;
    const totalPageCount = useDataSelector.getState().totalPageCount;
    const [step, setStep] = useState(0)

    // 페이지 리스트 UI 생성
    const newArr: number[] = new Array()
    for (let i = 1; i <= totalPageCount; i++) {
        newArr.push(i)
    }

    const length = newArr.length
    const divide = Math.floor(length / 10) + (Math.floor(length % 10) > 0 ? 1 : 0)
    const res: any = []

    for (let i = 0; i <= divide; i++) {
        // 배열 0 부터 n 개씩 잘라 새 배열에 넣기
        res.push(newArr.splice(0, 10))
    }

    // 특정 페이지로 이동
    const moveToPage = (selected: number) => {
        setPageState(selected)
        useDataSelector.getState().fetchData();
    }

    // 이전 페이지로 이동
    const moveToPrevPage = () => {
        if (step === 0) return
        else {
            setStep(step - 1)
            moveToPage(res[step - 1][0])
        }
    }

    // 다음 페이지로 이동
    const moveToNextPage = () => {
        if (step < res[step].length - 2) {
            setStep(step + 1)
            moveToPage(res[step + 1][0])
        } else return
    }

    return (
        <footer className={styles.footer}>
            <div className={styles.pagination}>
                <button className={styles.pagination__button} onClick={() => moveToPrevPage()}>
                    <img src="icon-arrowLeft.svg" alt="" />
                </button>
                {/* 변경될 UI 부분 */}
                {/* <span>1</span> */}
                {res[step] &&
                    res[step].map((item: number, index: number) => {
                        if (item < 11) {
                            return (
                                <button className={index === pageState - 1 ? `${styles.pagination__button} ${styles.active}` : `${styles.pagination__button} ${styles.inactive}`} key={item} onClick={() => moveToPage(item)}>
                                    {item}
                                </button>
                            )
                        } else {
                            return (
                                <button className={index === pageState - 1 - step * 10 ? `${styles.pagination__button} ${styles.active}` : `${styles.pagination__button} ${styles.inactive}`} key={item} onClick={() => moveToPage(item)}>
                                    {item}
                                </button>
                            )
                        }
                    })}
                <button className={styles.pagination__button} onClick={() => moveToNextPage()}>
                    <img src="icon-arrowRight.svg" alt="" />
                </button>
            </div>
        </footer>
    )
}

export default CommonFooter