import { create } from 'zustand'

type State = {
    pageState: number
    setCurrentPage: (page: number) => void
}

export const usePageState = create<State>((set) => ({
    pageState: 1,
    setCurrentPage: (page: number) => set(() => ({ pageState: page })),
}))