// ** Next Imports
import Head from 'next/head'
import { Router, useRouter } from 'next/router'
import Cookies from 'js-cookie';

import { wrapper } from '../../store/store'; 
import AuthWrapper  from 'utils/AuthWrapper'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import '../../styles/globals.css'
import { useDispatch, useSelector } from 'react-redux';

import { getUserData } from 'store/actions/user-actions';
import { useEffect } from 'react';

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

// ** Configure JSS & ClassName
const App = props => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const dispatch = useDispatch();



  useEffect(() => {
    // Dispatch getUserData when the component mounts
    dispatch(getUserData());
  }, [dispatch]);



  // Variables
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)


  return (
    

    <CacheProvider value={emotionCache}>
      <Head>
        <title>{`${themeConfig.templateName} - CC`}</title>
        <meta
          name='description'
          content={`${themeConfig.templateName} – Material Design React Admin Dashboard Template – is the most developer friendly & highly customizable Admin Dashboard Template based on MUI v5.`}
        />
        <meta name='keywords' content='Material Design, MUI, Admin Template, React Admin Template' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
          <AuthWrapper>
              <SettingsProvider>
                <SettingsConsumer>
                  {({ settings }) => {
                    return <ThemeComponent settings={settings}>{getLayout( <Component {...pageProps} />)}</ThemeComponent>
                  }}
                </SettingsConsumer>
              </SettingsProvider>
          </AuthWrapper>
        </CacheProvider>
    

  )
}

// Wrap the App component with the wrapper from next-redux-wrapper
export default wrapper.withRedux(App);
