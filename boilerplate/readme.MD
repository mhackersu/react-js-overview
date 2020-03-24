# React Boilerplate

### For Development

`npm run dev`

### For Production

`npm run prod`

This boilerplate is built based on the concepts documented in the [foundations](https://github.com/desertsofcacti/react-js-overview/tree/foundations) branch.

This boilerplate is created from scratch using Webpack and Babel.

dependencies:

```
    "react": "^16.13.0",
    "react-dom": "^16.13.0"
```

dev-dependencies:

```
    "@babel/core": "^7.8.7",
    "@babel/preset-env": "^7.8.7",
    "@babel/preset-react": "^7.8.3",
    "babel-loader": "^8.0.6",
    "css-loader": "^3.4.2",
    "html-webpack-plugin": "^3.2.0",
    "style-loader": "^1.1.3",
    "webpack": "^4.42.0",
    "webpack-cli": "^3.3.11",
    "webpack-dev-server": "^3.10.3"
```

`babel` presets:

```
  "babel": {
    "presets": [
      "@babel/preset-env",
      "@babel/preset-react"
    ]
  },
```

```
npm init -y && npm i react react-dom
```

This creates the following in `node_modules`

```
js-tokens
loose-envify
object-assign
prop-types
react
react-dom
react-is
scheduler
```

Create `.gitignore`

```
echo "node_modules\n.DS_Store\ndist"  >> .gitignore
```

Make an app folder and application structure

```
mkdir app && touch app/index.css && touch app/index.html && touch app/index.js
```
