const path = require('path');

module.exports = {
  entry: './src/index.js', // Entry point for your app
  output: {
    path: path.resolve(__dirname, 'build'), // Output directory
    filename: 'bundle.js', // Output file
    publicPath: '/', // Ensures routing works correctly in React apps
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Transpile JS/JSX files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/, // Process CSS files
        use: ['style-loader', 'css-loader'], // Loaders to inject CSS into the DOM and process CSS files
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/, // Process images
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext]', // Output path for images
        },
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'), // Serve content from the build directory
    },
    compress: true,
    port: 3000,
    historyApiFallback: true, // Ensure React Router works in dev mode
    allowedHosts: 'all',
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Resolve JS and JSX extensions
  },
  mode: 'development', // Change to 'production' for production builds
};
