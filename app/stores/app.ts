import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    user: null as any,
    isDarkMode: true,
    notifications: [] as string[]
  }),
  actions: {
    setUser(user: any) {
      this.user = user
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
    },
    addNotification(message: string) {
      this.notifications.push(message)
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.user
  }
})
