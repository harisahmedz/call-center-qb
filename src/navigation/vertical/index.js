// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import {PhoneClassic } from 'mdi-material-ui'

const navigation = () => {
  return [
    // {
    //   title: 'Dashboard',
    //   icon: HomeOutline,
    //   path: '/'
    // },
    // {
    //   sectionTitle: 'Pages'
    // },
    {
      title: 'Orders',
      icon: Table,
      path: '/orders'
    },
    {
      title: 'Order Tracking',
      icon: CreditCardOutline,
      path: '/orders/order-tracking',
      openInNewTab: true
    },
    {
      title: 'CC Orders Count',
      icon: AccountCogOutline,
      path: '/orders/call-center',
      openInNewTab: true
    },
    {
      title: 'Agent Stats',
      icon: AccountPlusOutline,
      path: '/orders/call-center/agent-stats',
      openInNewTab: true
    },
    {
      title: 'Interaction Record',
      icon: PhoneClassic,
      path: '/interaction-records',
      openInNewTab: true
    },
  ]
}

export default navigation
