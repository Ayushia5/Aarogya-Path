import { create } from 'zustand';

const useAuthStore = create((set) => ({
    user: null,
    loading: true,
    isLoggedIn: false,
    setUser: (user) => set({ user, isLoggedIn: !!user, loading: false }),
    setLoading: (loading) => set({ loading }),
    logout: () => set({ user: null, isLoggedIn: false, loading: false }),
}));

export default useAuthStore;
