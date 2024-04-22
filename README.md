<p align="center">
  <img src="banners/main.png" />
</p>

[![Build Size](https://img.shields.io/bundlephobia/minzip/@stealthex-io/widget?label=bundle%20size&style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/package/@stealthex-io/widget)
[![Version](https://img.shields.io/npm/v/@stealthex-io/widget?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/@stealthex-io/widget)
[![Maintained](https://img.shields.io/maintenance/yes/2024?style=flat&colorA=000000&colorB=000000)](https://github.com/StealthEX-io/widget-library/commits/master)
[![Issues](https://img.shields.io/github/issues/StealthEX-io/widget-library?style=flat&colorA=000000&colorB=000000)](https://github.com/StealthEX-io/widget-library/issues)

StealthEX brings you a handy cryptocurrency exchange widget for crypto-related websites. Exchanges are always private, custody-free and take just a couple of clicks (and a personal wallet) to perform.

All the swaps made with the widget grant you profit + the appearance and assets you would like to highlight are customizable.
Register is StealthEX [Partner Account](https://stealthex.io/pp/) to track the stats and get all the info on our affiliate tools [here](https://stealthex.io/partners/).

## Install

### npm

```bash
npm install @stealthex-io/widget
```

```js
import widget from "@stealthex-io/widget"
```

### CDN ([unpkg](https://unpkg.com))

<https://unpkg.com/@stealthex-io/widget/dist/index.browser.js>

This version creates `window.stealthexWidget` object with all exported methods.

## Create a container and attach id to it

```html
<div id="stealthex-widget-container"></div>
```

## Initialize your widget

1. Copy your widget id in the [Partner profile](https://stealthex.io/pp/widget/) `Code` tab

2. Use the `init` method:

```js
const cleanup = widget.init("your-id")
```

3. `init` returns a cleanup function that you can use to prevent memory leaks

## Optionally listen to events

```js
const handler = () => {
  console.log("Exchange started!")
}

widget.events.on("exchangestart", handler)
widget.events.off("exchangestart", handler)
```

## API

### `init(id, options)`

Returns a cleanup function: `() => void`

#### id

Type: `string`

This is your widget id that you can get in the [Partner profile](https://stealthex.io/pp/widget/) `Code` tab.

#### options

Type: `object`

| Key         | Type     | Description                                    | Default value              |
| ----------- | -------- | ---------------------------------------------- | -------------------------- |
| size        | `number` | Widget width size                              | 330                        |
| containerId | `string` | HTML container id where widget will be mounted | stealthex-widget-container |
| iframeHost  | `string` | The widget iframe base URL                     | https://stealthex.io       |

### `events.on(event, listener)`

Returns: `void`

#### event

Type: `string`

Available events:

| Event         | Value       |
| ------------- | ----------- |
| exchangestart | `undefined` |
| statuschange  | `string`    |

#### listener

Type: `(data) => void`

### `events.off(event, listener)`

Returns: `boolean` (`false` if listener wasn't subscribed to event)

#### listener

Type: `(data) => void`

The listener that was previously subscribed.
