# 🌬️ TailwindCSS - Expose colors 🖌️

Expose specific colors from your Tailwind CSS theme as CSS variables. This is useful if you want to use the colors in your `Theme` in your CSS. Maybe conditionally choose a variable in JS and use it in your CSS.

> [!IMPORTANT]
> This is a **complete rewrite** of the snippet I provided in the [Gist](https://gist.github.com/Merott/d2a19b32db07565e94f10d13d11a8574) wich started this conversation. As I saw the usage potential of this piece of code I decided to turn it into a package, _with enhancements and even more use cases_. Enjoy! 😃

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

This is how a `tailwind.config.ts` file could look like with this plugin.

```ts
export default {
  theme: { extend: {} },
  content: ["./src/**/*.{ts,tsx}"],
  plugins: [exposeColors({ colors: ["red", "green", "blue"] })]
} satisfies Config
```

### Exposed colors

In your HTML you will now have access to the following CSS variables.

```css
::root {
  --tw-red-500: 239, 68, 68;
  --tw-green-500: 34, 197, 94;
  --tw-blue-500: 59, 130, 246;
}
```

### Usage

And in your CSS you can use them like this.

```css
body {
  background: rgba(var(--tw-red-500), 0.1);
}
```

## License

This code is licensed under the Apache License, Version 2.0: [LICENSE](../LICENSE)
