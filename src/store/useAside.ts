import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { APP_ID } from '@/config/constants'

type AsideState = {
  minimize: boolean
  setMinimize: (payload: boolean) => void
  toggleMinimize: () => void
}

const initialState = false

export const useAside = create<AsideState>()(
  persist(
    (set) => ({
      minimize: initialState,
      setMinimize: (payload: boolean) => set({ minimize: payload }),
      toggleMinimize: () => set((state) => ({ minimize: !state.minimize })),
    }),
    {
      name: `${APP_ID}-aside${
        process.env.NODE_ENV === 'development' ? '-dev' : ''
      }`,
    }
  )
)
