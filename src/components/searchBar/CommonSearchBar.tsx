import { useState } from 'react'
import styles from './CommonSearchBar.module.scss'
import { useSearchValue } from '@/stores/searchValueState'
import { usePageState } from '@/stores/pageState'
import { useDataSelector } from '@/stores/dataSelector'

function CommonSearchBar() {
    const setSearchValue = useSearchValue((state) => state.setSearchValue)
    const setpageState = usePageState((state) => state.setPageState)

    const [text, setText] = useState('')
    const OnChange = (e: any) => {
        setText(e.target.value)
    }

    const OnSearch = () => {
        setpageState(1)
        if (text === '') {
            setSearchValue('office')
        } else {
            console.log(text)
            setSearchValue(text)
        }
        useDataSelector.getState().fetchData();
    }

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            if (text === '') {
                setText('office')
            } else {
                console.log(text)
                setText(text)
            }
            OnSearch()
        }
    }

    return (
        <div className={styles.searchBar}>
            <div className={styles.searchBar__search}>
                <input type="text" placeholder="찾으실 이미지를 검색하세요." className={styles.searchBar__search__input
                } value={text} onChange={OnChange} onKeyDown={handleKeyDown} />
                <img src="icon-search.svg" alt="" onClick={OnSearch} />
            </div>
        </div>
    )
}

export default CommonSearchBar