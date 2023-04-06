import widget from "../src"
import { waitFor } from "@testing-library/dom"

afterEach(() => {
  document.body.innerHTML = ""
})

describe("initialization", () => {
  it("throws when passing a nonexistent container id", () => {
    expect(() => widget.init("id")).toThrow()
  })

  it("initializes with custom id", () => {
    const container = document.createElement("div")
    container.id = "container"

    document.body.appendChild(container)

    widget.init("id", { containerId: "container" })

    expect(document.getElementById("stealthex-widget")).toBeInTheDocument()
    expect(container.children.length).toBe(1)
  })

  it("initializes with default id", () => {
    const container = document.createElement("div")
    container.id = "stealthex-widget-container"

    document.body.appendChild(container)

    widget.init("id")

    expect(container.children.length).toBe(1)
  })

  it("initializes with right attributes", () => {
    const container = document.createElement("div")
    container.id = "stealthex-widget-container"

    document.body.appendChild(container)

    widget.init("id")

    const widgetElement = container.children[0]! as HTMLIFrameElement

    expect(widgetElement).toBeInTheDocument()

    expect(widgetElement.id).toBe("stealthex-widget")
    expect(widgetElement.src).toBe("https://stealthex.io/widget/id")
  })

  it("cleanups", () => {
    const container = document.createElement("div")
    container.id = "stealthex-widget-container"

    document.body.appendChild(container)

    const cleanup = widget.init("id")

    expect(container.children.length).toBe(1)
    cleanup()
    expect(container.children.length).toBe(0)
  })
})

describe("events", () => {
  it("emits exchangestart event", async () => {
    const container = document.createElement("div")
    container.id = "stealthex-widget-container"

    document.body.appendChild(container)

    widget.init("id")

    const mock = jest.fn()

    widget.events.on("exchangestart", mock)

    window.postMessage(
      {
        type: "sx-widget-exchangestart"
      },
      "*"
    )

    await waitFor(() => expect(mock).toHaveBeenCalledTimes(1))
  })

  it("emits statuschange event", async () => {
    const container = document.createElement("div")
    container.id = "stealthex-widget-container"

    document.body.appendChild(container)

    widget.init("id")

    const mock = jest.fn()

    widget.events.on("statuschange", mock)

    window.postMessage(
      {
        type: "sx-widget-statuschange",
        details: "confirming"
      },
      "*"
    )

    await waitFor(() => {
      expect(mock).toHaveBeenCalledTimes(1)
      expect(mock).toHaveBeenCalledWith("confirming")
    })
  })
})
