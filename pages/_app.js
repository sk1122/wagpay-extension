import '../styles/globals.css'
import { AppContext } from '../context'
import { useState } from "react"

function MyApp({ Component, pageProps }) {
  const [amount, setAmount] = useState('');
  const [BaseToken, setBaseToken] = useState("")
  const [ToToken, setToToken] = useState("")
  let shared_state = {
    amount,
    setAmount,
    BaseToken,
    setBaseToken,
    ToToken,
    setToToken
  }

  return (
    <AppContext.Provider value={shared_state}>
      <Component {...pageProps} />
    </AppContext.Provider>
  )
}

export default MyApp
