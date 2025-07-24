class WebpackExcludeEntry{
	constructor(patterns){
		this.patterns = patterns;
	}

	apply(compiler){
		compiler.hooks.compilation.tap("WebpackExcludeEntry", (compilation) => {
			compilation.hooks.processAssets.tap(
				{
					name: "WebpackExcludeEntry",
					stage: compilation.constructor.PROCESS_ASSETS_STAGE_OPTIMIZE_INLINE,
				},
				(assets) => {
					Object.keys(assets)
						  .filter(asset => {
							  let match = false,
								  i = this.patterns.length;
							  while(i--){
								  if(this.patterns[i].test(asset)){
									  match = true;
									  break;
								  }
							  }
							  return match;
						  })
						  .forEach(asset => {
							  compilation.deleteAsset(asset);
						  });
				},
			);
		});
	}
}

module.exports = WebpackExcludeEntry;