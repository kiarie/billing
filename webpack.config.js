var config = {
   entry: './billing/js/bills_original.js',
	
   output: {
      path:'/var/www/billing/billing/js',
      filename: './billing/js/bundle.js',
   },
	
   devServer: {
      inline: true,
      port: 8080
   },
	
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
				
            query: {
               presets: [["es2015", { "modules": false }]]
            }
         }
      ]
   }
}
module.exports = config;