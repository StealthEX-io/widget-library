export type Listener<T = unknown> = T extends undefined
  ? () => void
  : (data: T) => void

type Events = Record<PropertyKey, unknown>

type DatalessEventNames<EventData> = {
  [Key in keyof EventData]: EventData[Key] extends undefined ? Key : never
}[keyof EventData]

/**
 *  Generic event bus (event emitter)
 *
 *  @example
 *  type Events = {
 *    eventWithoutData: undefined,
 *    eventWithData: number
 *  }
 *  const eventBus = new EventBus<Events>()
 *
 *  const eventWithDataListener = () => {}
 *  eventBus.on("eventWithData", eventWithDataListener)
 *  eventBus.emit("eventWithData", 4)
 *
 *  const eventWithoutDataListener = () => {}
 *  eventBus.on("eventWithoutData", eventWithoutDataListener)
 *  eventBus.emit("eventWithoutData")
 *
 *  eventBus.off("eventWithData", eventWithoutListener)
 *  eventBus.off("eventWithoutData", eventWithoutDataListener)
 */
export class EventBus<
  EventData extends Events,
  DatalessEvents = DatalessEventNames<EventData>
> {
  private eventsMap: Map<PropertyKey, Set<Listener>>

  constructor() {
    this.eventsMap = new Map()
  }

  emit<Name extends DatalessEvents>(event: Name): boolean
  emit<Name extends keyof EventData>(
    event: Name,
    data: EventData[Name]
  ): boolean
  emit<Name extends keyof EventData>(event: Name, data?: EventData[Name]) {
    const eventListeners = this.eventsMap.get(event)
    if (!eventListeners || eventListeners.size == 0) {
      return false
    }

    eventListeners.forEach((listener) => listener(data))

    return true
  }

  on<Name extends keyof EventData>(
    event: Name,
    listener: Listener<EventData[Name]>
  ): void {
    if (!this.eventsMap.has(event)) {
      this.eventsMap.set(event, new Set())
    }
    const eventListeners = this.eventsMap.get(event)!

    eventListeners.add(listener)
  }

  off<Name extends keyof EventData>(
    event: Name,
    listener: Listener<EventData[Name]>
  ): boolean {
    const eventListeners = this.eventsMap.get(event)

    if (!eventListeners) {
      return false
    }

    return eventListeners.delete(listener)
  }
}
