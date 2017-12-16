# render-template-loader-demo
Use render-template-loader in a webpack build.

See [`webpack.config.js`](https://github.com/jabney/render-template-loader-demo/blob/master/webpack.config.js) for examples of setting up `render-template-loader`.

The build output is located in the [`dist`](https://github.com/jabney/render-template-loader-demo/tree/master/dist) folder.

- `index.html` is rendered from `src/index.ejs` and `src/body.ejs`. It uses `html-loader` in the module rules in order to require the sub pages, `page.pug` and `page.hbs` from the anchor tags. It also makes use of the `HtmlWebpackPlugin` to auto-link the `main.bundle.js` file and generate the final output.

- `page-pug.html` is rendered from `src/page.pug` and `src/partial.pug` and uses `file-loader` to copy the output to the `dist` folder.

- `page-hbs.html` is rendered from `src/page.hbs` and `src/partial.hbs` and uses `file-loader` to copy the output to the `dist` folder.

**Note:** `extract-loader` is used in the `pug` and `hbs` rules to extract the contents of the module produced by `render-template-loader` before being processed by `file-loader`.
