export const state = () => ({
    navigationDrawer: false,
    appBarDark: true
})

export const mutations = {
    toggleNavigationDrawer(state) {
        state.navigationDrawer = !state.navigationDrawer
    }
}
