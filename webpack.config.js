
const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
    // The rule for rendering index.html from an ejs template.
    {
      test: /\/src\/index.ejs$/,
      use: [{
        loader: 'extract-loader'
      },
      {
        loader: 'html-loader',
        options: {
          interpolate: 'require'
        }
      },
      {
        loader: 'render-template-loader',
        options: {
          engine: 'ejs',
          locals: {
            title: 'Render Template Loader',
            desc: 'Rendering templates with a Webpack loader since 2017'
          },
          engineOptions: function (info) {
            // Ejs wants a filename for partials rendering.
            // (Configuring a "views" option can also be done.)
            return { filename: info.filename }
          }
        }
      }]
    },
    // The rule for rendering page-pug.html from a pug template.
    {
      test: /\.pug$/,
      use: [{
        loader: 'file-loader?name=[name]-[ext].html'
      },
      {
        loader: 'extract-loader'
      },
      {
        loader: 'render-template-loader',
        options: {
          engine: 'pug',
          locals: {
            title: 'Rendered with Pug!',
            desc: 'Partials Support'
          },
          engineOptions: function (info) {
            return { filename: info.filename }
          }
        }
      }]
    },
    // The rule for rendering page-hbs.html from a handlebars template.
    {
      test: /\.hbs$/,
      use: [{
        loader: 'file-loader?name=[name]-[ext].html'
      },
      {
        loader: 'extract-loader'
      },
      {
        loader: 'render-template-loader',
        options: {
          engine: 'handlebars',
          init: function (engine, info) {
            engine.registerPartial(
              'body',
              fs.readFileSync('./src/body.hbs').toString()
            )
          },
          locals: {
            title: 'Rendered with Handlebars!',
            desc: 'Partials Support'
          },
        }
      }]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.ejs'
    })
  ]
}
