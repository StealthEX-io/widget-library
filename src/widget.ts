import { EventBus } from "./event-bus"

type Status =
  | "confirming"
  | "exchanging"
  | "sending"
  | "finished"
  | "failed"
  | "refunded"
  | "expired"
  | "verifying"

type Events = {
  exchangestart: undefined
  statuschange: Status
}

type InitOptions = {
  size?: number
  containerId?: string
  iframeHost?: string
}

type Cleanup = () => void

const eventBus = new EventBus<Events>()

const height = 330
const widgetId = "stealthex-widget"

let nInstances = 0

export function init(id: string, options?: InitOptions): Cleanup {
  const {
    size = 330,
    containerId = "stealthex-widget-container",
    iframeHost = "https://stealthex.io"
  } = options || {}

  if (typeof document == "undefined") {
    throw new Error(
      "You are trying to initialize widget in a non-browser environment"
    )
  }

  const container = document.getElementById(containerId)

  if (container == null) {
    throw new Error(
      `Could not find container with the following id: ${containerId}`
    )
  }

  const iframe = document.createElement("iframe")

  iframe.id = widgetId
  iframe.src = `${iframeHost}/widget/${id}/`

  iframe.style.border = "none"
  iframe.style.borderRadius = "10px"
  iframe.style.overflow = "hidden"
  iframe.style.width = "100%"
  iframe.style.maxWidth = `${size}px`
  iframe.style.height = `${height}px`
  iframe.style.boxShadow = "0px 0px 32px 0px rgba(0, 0, 0, 0.06)"
  iframe.style.display = "block"

  container.appendChild(iframe)
  nInstances += 1

  if (nInstances == 1) {
    window.addEventListener("message", handleMessage)
  }

  return () => {
    nInstances -= 1

    if (nInstances == 0) {
      window.removeEventListener("message", handleMessage)
    }

    iframe.remove()
  }
}

function handleMessage(event: MessageEvent) {
  if (typeof event.data != "object") {
    return
  }

  if (!("type" in event.data)) {
    return
  }

  switch (event.data.type) {
    case "sx-widget-exchangestart": {
      eventBus.emit("exchangestart")

      break
    }

    case "sx-widget-statuschange": {
      if ("details" in event.data && typeof event.data.details == "string") {
        eventBus.emit("statuschange", event.data.details)
      }

      break
    }
  }
}

export const events = {
  on: eventBus.on.bind(eventBus),
  off: eventBus.off.bind(eventBus)
}
