import { create } from 'zustand'
import axios from 'axios'
import { usePageState } from './pageState'
import { useSearchValue } from './searchValueState'

type State = {
    imgUrls: any[]
    fetchData: () => Promise<void>
}

export const useDataSelector = create<State>((set) => ({
    imgUrls: [],
    fetchData: async () => {
        const searchValue = useSearchValue.getState().searchValue
        const pageValue = usePageState.getState().pageState

        const API_URL = 'https://api.unsplash.com/search/photos'
        const ACCESS_KEY = 'WAifS-M-6-ZitJJokc7ACHyZYswi47-pWJrCfJkyPnk'
        const PER_PAGE = 30

        try {
            const res = await axios.get(`${API_URL}?query=${searchValue}&per_page=${PER_PAGE}&client_id=${ACCESS_KEY}&page=${pageValue}`)
            //console.log('API Response:', res)
            if (res.status === 200) {
                set({ imgUrls: res.data.results })
            }
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    },
}))

