# webpack-exclude-entry
Excludes files from output

### install
`npm i -D webpack-exclude-entry`

### Use
	const ExcludeEntry = require('webpack-exclude-entry');
	const MiniCssExtractPlugin = require("mini-css-extract-plugin");

	const extractSass = new MiniCssExtractPlugin({
		filename: './css/[name].css',
	});
	module.exports = (env, argv) => {

		return {
			entry: {
				"style.min": [jsPath + 'style.js'],
				"build.min": [jsPath + 'index.js'],
			},
			output: {
				path: './dist/',
				filename: 'js/[name].js',
			},
			plugins: [
				extractSass,
				new ExcludeEntry([/style\.min\.js/]), //do not save files
			],
		};
	};
	
### Output result
	./dist/css/style.min.css
	./dist/js/build.min.js