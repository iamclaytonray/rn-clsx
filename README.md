# rn-clsx

This is a `classnames` or `clsx` like lib for React Native. 0 dependencies. Pure JS so no linking.

### Getting Started

```sh
yarn add rn-clsx
```

or

```sh
npm i rn-clsx
```

### Docs

```js
const styles = {
  disabled: { activeOpacity: 0.5 },
  bgGreen: { backgroundColor: 'green' },
};

const combined = clsx({ disabled: true, bgGreen: false }, styles);

// => { activeOpacity: 0.5 }

props.isGreen = true;
const combined = clsx({ disabled: true, bgGreen: props.isGreen }, styles);

// => { activeOpacity: 0.5, backgroundColor: 'green' }
```

### Important Notes

Order of the keys passed into `clsx` is extremely important. Essentially, all that's really happening is each key is evalutated as truthy or not. If it is, the value for the key is merged into the final style object. Because of this, you need to keep a close eye on what you supply to the first object. For example

```js
// src/components/Example.js
const Example = ({ disabled, colorful }) => {
  const containerStyles = clsx(
    {
      disabled,
      colorful,
    },
    styles,
  );

  return (
    <View style={containerStyles}>
      <Text>rn-clsx is awesome</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  colorful: {
    backgroundColor: 'red',
  },
  disabled: {
    backgroundColor: 'gray',
  },
});

// src/index.js
/*
 * `backgroundColor will still be 'red' because `colorful` is after `disabled` (when passed into `clsx`) and gets overwritten
 */

<Example colorful disabled />;
```

Here's a correct example

```js
// src/components/Example.js
const Example = ({ disabled, colorful }) => {
  const containerStyles = clsx(
    {
      // Look at the order of these two.
      // `colorful` is now first, allowing `disabled` to override `colorful` when `disabled` becomes truthy.
      // this is what you'd expect in a real app.
      colorful,
      disabled,
    },
    styles,
  );

  return (
    <View style={containerStyles}>
      <Text>rn-clsx is awesome</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  colorful: {
    backgroundColor: 'red',
  },
  disabled: {
    backgroundColor: 'gray',
  },
});

// src/index.js

// `backgroundColor is now gray!
<Example colorful disabled />;

// `backgroundColor is red
<Example colorful />;
```

---

You can use either an object literal or `StyleSheet.create()` when passing into the second arg to `clsx` (which is the `styles` arg)

### License

MIT!
