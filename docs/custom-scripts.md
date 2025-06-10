# Custom Scripts

You can expand Textypie's functionality yourself. Each script is a standalone JavaScript file that loads when the application starts. If you create something cool or useful, feel free to send [pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) and share it with everyone else.\
Possible addition to [default scripts](https://github.com/unmilley/textypie/tree/main/scripts/default).

> [!WARNING]
> Custom Scripts only work for the [desktop version](https://github.com/unmilley/textypie/releases/latest) of the application; unfortunately, only [default scripts](https://github.com/unmilley/textypie/tree/main/scripts/default) can be used in the browser.

## Setup

The folder with your scripts is located here: `~\.textypie\scripts`.\
The file `~\.textypie\config.json` does not need to be changed; it is generated when the application is launched.

> [!TIP]
> You can access the scripts from the application by opening the menu in the upper left corner.

## Writing Custom Scripts

### Meta info

First, add a description for your script in JSON format.

```javascript
/**
  {
    "name":"Hex to RGB",
    "description":"Convert color in hexadecimal to RGB.",
    "author":"Milley",
    "icon":"bx:color",
    "tags":"hex,color,rgb,convert"
  }
**/
```

- `name`, `description` and `author` are the name of the script, its description and the author's name, respectively.
- The `icon` is a visual representation of the actions of your scripts. You can use any icons you want using **[Icônes](https://icones.js.org/)**. The format must necessarily be **"collection:icon-name"**.\
  Предпочтительно использовать [Boxicons](https://icones.js.org/collection/bx).
- `tags` are used by the fuzzy-search algorithm to filter and sort results.

### The Main Function

Your script must export the `main()` function, which takes a single argument of type **string**.

```javascript
export function main(input) {
	// Do something useful here (or not)
}

/* or */

export const main = (input) => {
	// Do something useful here (or not)
}
```

### Returnable object

```typescript
export const main = (input: string) => {
  data?: string
  info?: string
  error?: string
}
```

- `data`: all content in the tab (file) will be replaced with this content
- `info`: notification in the lower right corner
- `error`: notification in the lower right corner

All fields are optional, and there is no need to notify that the script has been executed.
Act according to the situation, and also take an example from [default scripts](https://github.com/unmilley/textypie/tree/main/scripts/default).

### Import node packages

If you need any library, it should be inserted **after** [Meta info](#meta-info).

> [!WARNING]
> Remember that the library will not load without an internet connection.

```javascript
...
   "tags":"table,convert"
 }
**/
import Papa from 'https://cdn.jsdelivr.net/npm/papaparse@5.5.2/+esm' // <--

export function main(input) {
...
```
