import { create } from 'zustand'

type State = {
    pageState: number
    setPageState: (page: number) => void
}

export const usePageState = create<State>((set) => ({
    pageState: 1,    
    setPageState: (page: number) => set(() => ({ pageState: page })),
}))