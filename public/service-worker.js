var cache_name = "app-cache-v1";
var urlsToCache = [
	'/',
	'/index.html',
	'/scripts/app.js',

	'/scripts/angular-1.7.8/angular.min.js',
	'/scripts/angular-1.7.8/angular-animate.min.js',
	'/scripts/angular-1.7.8/angular-aria.min.js',
	'/scripts/angular-1.7.8/angular-material-icons.min.js',
	'/scripts/angular-1.7.8/angular-messages.min.js',
	'/scripts/angular-1.7.8/angular-route.min.js',

	'/scripts/angular-material-1.1.12/angular-material.min.js',
	'/scripts/angular-material-1.1.12/angular-material.min.css',

	'/styles/mainstyle.css',
	'/styles/material-design-icon-fonts/icon-font-include.css',
	'/styles/material-design-icon-fonts/icon-fonts.woff2',

	'/favicon.png',
	'images/icons/icon-48x48.png'	
];

if('serviceWorker' in navigator){
	window.addEventListener('load', function(){
		navigator.serviceWorker.register('/service-worker.js').
		then(function(registration){
			console.log("registering");
		}, function(err){
			console.log("not registered");
		});
	});
}

self.addEventListener('install', function(event){
	event.waitUntil(
		caches.open(cache_name).
		then(function(cache){
			console.log("installed");
			return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener('fetch', function(event){
	event.respondWith(
		caches.match(event.request)
		.then(function(response){
			if(response){
				return response;
			}
			/*var fetchRequest = event.request.clone();

			return fetch(fetchRequest)
			.then(function(response){
				if(!response || response.status !== 200){
					return response;
				}
			var responseToCache = response.clone();

			caches.open(cache_name)
			.then(function(cache){
				cache.put(event.request, responseToCache);
				});
			return response;
			});*/
		})

	);
});