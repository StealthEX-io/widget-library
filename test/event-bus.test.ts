import { EventBus } from "../src/event-bus"

it("has right types", () => {
  const eventBus = new EventBus<{ event: undefined; eventWithData: string }>()

  // @ts-expect-error
  eventBus.emit("event", 1)
  eventBus.emit("event", undefined)

  // @ts-expect-error
  eventBus.emit("eventWithData", undefined)
  eventBus.emit("eventWithData", "string")
})

it("notifies subscribed listeners", () => {
  const eventBus = new EventBus<{ event: undefined }>()

  const listener = jest.fn()

  eventBus.on("event", listener)
  eventBus.emit("event")

  expect(listener).toBeCalledTimes(1)
})

it("notifies all (>1) subscribed listeners", () => {
  const eventBus = new EventBus<{ event: undefined }>()

  const firstListener = jest.fn()
  const secondListener = jest.fn()

  eventBus.on("event", firstListener)
  eventBus.on("event", secondListener)

  eventBus.emit("event")

  expect(firstListener).toBeCalledTimes(1)
  expect(secondListener).toBeCalledTimes(1)
})

it("doesn't notify unsubscribed listeners", () => {
  const eventBus = new EventBus<{ event: undefined }>()

  const firstListener = jest.fn()
  const secondListener = jest.fn()

  eventBus.on("event", firstListener)

  eventBus.on("event", secondListener)
  eventBus.off("event", secondListener)

  eventBus.emit("event")

  expect(firstListener).toBeCalledTimes(1)
  expect(secondListener).toBeCalledTimes(0)
})
