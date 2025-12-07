import { create } from 'zustand'

type State = {
    searchValue: string
    setSearchValue: (value: string) => void
}

export const useSearchValue = create<State>((set) => ({
    searchValue: 'office',
    setSearchValue: (value: string) => set(() => ({ searchValue: value })),
}))
