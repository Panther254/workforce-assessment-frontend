import '@/styles/globals.css'
import NavigationBar from '../components/NavigationBar'
import styles from '../styles/Home.module.css'

export default function App({ Component, pageProps }) {
  return (<div className={styles.container}>
    <NavigationBar/>
    <Component {...pageProps} />
    </div>)
}
