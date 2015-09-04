// requirejs.config({
// 	baseUrl: "/js/",
// 	waitSeconds: 12,
// 	paths: {
// 		lib: 	"./lib",
// 		home: 	"./",
// 		main: 	"./main",
// 		async: 	"./async",
// 		modules:"./modules"
// 	}
// });

Counter = {
    Navigation: {
    	set: function(title){
    		$('ul.navbar-nav li').removeClass('active');
    		$('ul.navbar-nav li.' + title +'-nav').addClass('active');
    		//add other navgation items if needed.
    	}

    }
}
