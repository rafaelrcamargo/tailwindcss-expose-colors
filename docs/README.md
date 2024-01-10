# TailwindCSS - Expose colors

Expose specific colors from your Tailwind CSS theme as CSS variables.

## Options

- `colors`: `string[]`
  - The color keys from the `Theme` you want to expose.
  - Default: `["red"]`
- `shades`: `string[]`
  - The shades you want to expose. (Ps. _`DEFAULT` values are exposed as `--tw-primary` as it is with Tailwind classes_)
  - Default: `["500"]`
- `prefix`: `string`
  - The prefix to use for the CSS variables.
  - Default: `"--tw"`

## Example

```ts
export default {
  theme: { extend: {} },
  content: ["./src/**/*.{ts,tsx}"],
  plugins: [exposeColors({ colors: ["red", "green", "blue"] })]
} satisfies Config
```

### Exposed colors

```css
::root {
  --tw-red-500: 239, 68, 68;
  --tw-green-500: 34, 197, 94;
  --tw-blue-500: 59, 130, 246;
}
```

### Usage

```css
body {
  background: rgba(var(--tw-red-500), 0.1);
}
```

## License

This code is licensed under the Apache License, Version 2.0: [LICENSE](../LICENSE)
