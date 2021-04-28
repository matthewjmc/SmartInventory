
export const state = () => ({
    itemID: null,
    userID: null
  })
  
export const mutations = {
    SET_ITEM_ID (state, value) {
      console.log('set_item_id', value)
      state.itemID = value
    },
    SET_USER_ID (state, value) {
      console.log('set_user_id', value)
      state.userID = value
    }
}