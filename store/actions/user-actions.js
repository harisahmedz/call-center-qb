import Cookies from 'js-cookie';
import { userActions } from 'store/slice/userSlice';

export const getUserData = () => {
  return async(dispatch) => {
    const getUserFromCookies = () => {
        const token = Cookies.get('token');
        const fullName = Cookies.get('fullName');

        return {
            token: token || null,
            fullName: fullName || '',
            };
    };
    try{
        const userData = getUserFromCookies();
        console.log(userData, 'userData')

        //get data from cookie and set user
        if (userData.token && userData.fullName) {
            // Dispatch setUser with the userData from cookies
            dispatch(userActions.setUser(userData));
        }
    }catch(error){
    }
  };
};

