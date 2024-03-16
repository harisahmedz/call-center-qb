import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from 'store/slice/userSlice';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Cookies from 'js-cookie';

const AuthWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { token, fullName } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true)
  },[])
  useEffect(() => {

    if(isClient){
        if (!token || !fullName) {
            dispatch(userActions.clearUser()); // Clear user data
            router.push('/pages/login/'); // Redirect to login page
            setIsLoading(false)
        } else {
            setIsLoading(false); // Set loading to false if token and fullName are present
        }
 
    }

  }, [token,fullName, isClient ]);

  if (!isClient || isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }
  console.log(token, fullName);

  return <>{children}</>;
};

export default AuthWrapper;
