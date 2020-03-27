var cache_name = "app-cache-v2";
var urlsToCache = [
	'/',
	'/index.html',
	'/scripts/App.js',

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
	'images/icons/icon-32x32.png',
	'images/icons/icon-48x48.png',
	'images/icons/icon-128x128.png',
	'images/icons/icon-192x192.png',
	'images/icons/icon-256x256.png',
	'images/icons/icon-512x512.png'
];

if('serviceWorker' in navigator){
	window.addEventListener('load', function(){
		navigator.serviceWorker.register('service-worker.js').
		then(function(registration){
			console.log("registering");
		}, function(err){
			console.log("not registered");
		});
	});
}

self.addEventListener('install', function(event){
	event.waitUntil(
		caches.keys().then(function(cacheNames){ 
			return Promise.all(
				cacheNames.map(function(cacheName){
						console.log("deleting old caches");
						return caches.delete(cacheName);
					
					})
				);
			})
		);

	event.waitUntil(
		caches.open(cache_name).
		then(function(cache){
			console.log("installing new caches");
			return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener('fetch', function(event){
	if(event.request.url.includes("pandora-19-covid-tracker.firebaseapp.com")){
		event.respondWith(
		caches.match(event.request)
		.then(function(response){
			if(response){
				return response;
			}
			return fetch(event.request);
			})

		);
	}
});