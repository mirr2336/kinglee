import { create } from 'zustand'
import axios from 'axios'
import { usePageState } from './pageState'
import { useSearchValue } from './searchValueState'

type State = {
    imgUrls: any[]; // 이미지 URL 배열
    totalPageCount: number;  // 총 페이지 수
    fetchData: () => Promise<void>;
}

export const useDataSelector = create<State>((set) => ({
    imgUrls: [],
    totalPageCount: 200,  // 임시로 200으로 설정
    fetchData: async () => {
        const searchValue = useSearchValue.getState().searchValue
        const pageValue = usePageState.getState().pageState

        const API_URL = 'https://api.unsplash.com/search/photos'
        const ACCESS_KEY = 'WAifS-M-6-ZitJJokc7ACHyZYswi47-pWJrCfJkyPnk'
        const PER_PAGE = 30

        try {
            const res = await axios.get(`${API_URL}?query=${searchValue}&per_page=${PER_PAGE}&client_id=${ACCESS_KEY}&page=${pageValue}`)
            console.log('API Response:', res)
            //console.log('Total pages:', res.data.total_pages)
            if (res.status === 200) {
                set({ imgUrls: res.data.results })
                //set({ totalPageCount: res.data.total_pages })   // 총 페이지 수 가 334 로 나오지만 실제로는 200 까지밖에 없음
            }           
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    },
}))

