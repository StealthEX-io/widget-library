import { useEffect } from "react"
import widget from "../../src"

function App() {
  useEffect(() => {
    const widgetCleanup = widget.init("your-partner-id")

    const exchangeStartHandler = () => {
      console.log("EXCHANGE START")
    }

    widget.events.on("exchangestart", exchangeStartHandler)

    return () => {
      widgetCleanup()
      widget.events.off("exchangestart", exchangeStartHandler)
    }
  }, [])

  return null
}

export default App
