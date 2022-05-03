import '../styles/globals.css'
import { AppContext } from '../context'
import { useState } from "react"

function MyApp({ Component, pageProps }) {
  const [amount, setAmount] = useState('');
  const [BaseToken, setBaseToken] = useState("");
  const [ToToken, setToToken] = useState("");
  const [BaseTokenValue, setBaseTokenValue] = useState(0)
  const [ToTokenValue, setToTokenValue] = useState(0)

  let shared_state = {
    amount,
    setAmount,
    BaseToken,
    setBaseToken,
    ToToken,
    setToToken,
    BaseTokenValue,
    setBaseTokenValue,
    ToTokenValue,
    setToTokenValue
  }

  return (
    <AppContext.Provider value={shared_state}>
      <Component {...pageProps} />
    </AppContext.Provider>
  )
}

export default MyApp
