import styles from './CommonFooter.module.scss'
import { usePageState } from '@/stores/pageState'
import { useDataSelector } from '@/stores/dataSelector'

function CommonFooter() {

    const pageState = usePageState.getState().pageState;
    const setPageState = usePageState.getState().setPageState;

    // 특정 페이지로 이동
    const moveToPage = (selected: number) => {
        setPageState(selected)
        useDataSelector.getState().fetchData();
    }

    // 이전 페이지로 이동
    const moveToPrevPage = () => {
        if (pageState > 1) {
            moveToPage(pageState - 1);
        }
    }

    // 다음 페이지로 이동
    const moveToNextPage = () => {
        moveToPage(pageState + 1);
    }

    return (
        <footer className={styles.footer}>
            <div className={styles.pagination}>
                <button className={styles.pagination__button} onClick={() => moveToPrevPage()}>
                    <img src="icon-arrowLeft.svg" alt="" />
                </button> {pageState}
                {/* 변경될 UI 부분 */}
                {/* <span>1</span> */}
                <button className={styles.pagination__button} onClick={() => moveToNextPage()}>
                    <img src="icon-arrowRight.svg" alt="" />
                </button>
            </div>
        </footer>
    )
}

export default CommonFooter