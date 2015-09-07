define([], function() {
	var title = 'careers';
	console.log('careers main section');
	Counter.Navigation.set(title);
	// amstatz.EventBus.onContextInitialized(function() {
	// 	 amstatz.Navigation.setPageDefaults('fitness', 'acsm-assessments');
	// 	amstatz.PageScope.router = new Router({
	// 		collection : new Collection([], {
	// 			context : {
	// 			}
	// 		}),
			
	// 		labels : {
	// 			notMatchingResults : "<tr><td>No matching Health PAR-Qs.</td></tr>"
	// 		},
	// 		filterConfig : {
	// 			templates: {
	// 				suggestion: Handlebars.compile('<p>{{athlete.name}}</p>')
	// 			}
	// 		}
	// 	});

	// 	Backbone.history.start({pushState: true, root: amstatz.URL.prependGym('/fitness/acsmassessments')});
	// });
});