import {
    ADD_USER,
    SET_USERS,
    UPDATE_USER,
  } from "../actions/users";
  import user from "../../models/user";
  
  const initialState = {
    // availableUsers: [],
    availableUsers: [],
    profileUsers: [],
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case SET_USERS:
        return {
            availableUsers: action.users,
            profileUsers: action.userProfile,
        };
      case ADD_USER:
        const newUser = new User(
          action.userData.id,
          action.userData.ownerId,
          action.userData.realname,
          action.userData.imageUrl,
          action.userData.address,
          action.userData.phone,
        );
        return {
          ...state,
          availableUsers: state.availableUsers.concat(newUser),
          profileUsers: state.profileUsers.concat(newUser),
        };
      case UPDATE_USER:
        const userIndex = state.users;
        const updatedUser = new User(
          action.pid,
        //   state.userData[userIndex.ownerId],
          action.userData.realname,
          action.userData.imageUrl,
          action.userData.address,
          action.userData.phone,
          //state.userProducts[productIndex].price
        );
        const updatedUserProfile = [...state.users];
        updatedUserProfile[userIndex] = updatedUser;
        const availableUsersIndex = state.availableUsers.findIndex(
          (prod) => prod.id === action.pid
        );
        const updatedAvailableUser = [...state.availableUsers];
        updatedUserProfile[availableUsersIndex] = updatedUser;
        return {
          ...state,
          availableUsers: updatedAvailableUser,
        //   userProfile: updatedUserProfile,
        };
    }
    return state;
  };
  