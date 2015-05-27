var http = require('http');
/**
 * Purpose: create a simple event system using vanilla JavaScript (ES5)
 * 
 * Instructions: make this code work without modifying it in any way.
 * Using plain old JavaScript and no third-party libraries, you should
 * write new code that enables the code below to work properly.
 * 
 * Hint: even though it's typically a bad practice, don't be afraid to
 * extend native objects...
 *
 */

// Initialize associative array for the events list
Object.prototype.events = {};

// Register a new event
Object.prototype.on = function(triggeredEvent, callback) {
	if(callback === undefined) {
		console.log('Please supply a callback function.');
		return;
	}

	if(typeof callback !== 'function') {
		console.log('Please supply a function as a callback.');
		return;
	}

	if(this.events[triggeredEvent] !== undefined) {
		console.log('This event was already registered and will be overwritten.');
	}

	// Assign the event and its callback to the events list
	this.events[triggeredEvent] = callback;
};

// Trigger an event
Object.prototype.trigger = function(triggeredEvent, data) {
	var self = this;

	if(triggeredEvent === '*') {
		// Loop over all events and call each callback with the passed in data
		Object.keys(this.events).forEach(function(singleEvent) {
			self.events[singleEvent](data);
		});

		return; 
	}

	// Call the event's associated callback 
	if(this.events[triggeredEvent] !== undefined) {
		this.events[triggeredEvent](data);
	} else {
		console.log('The event doesn\'t exist.');
	}
};

// Remove an event or all events from the events list
Object.prototype.off = function(triggeredEvent) {
	// If no specific event is passed, delete all events
	if(triggeredEvent === undefined) {
		this.events = {};
		return;
	}

	// Delete the event and it's associated callback
	delete this.events[triggeredEvent];
};

//Create a new node server
http.createServer(function(req, res) {

	// Start with an object, any object
	var myObject = {};

	// Register an event on your object using
	// an `on` method
	myObject.on('myEvent', function(data) {
	    // Log the data passed to the callback
	    console.log(data);
	});

	// Trigger the event using a `trigger` method.
	// Include some data when you trigger the event.
	myObject.trigger('myEvent', {
	    company: 'Google',
	    location: 'Mountain View, CA',
	    website: 'http://google.com'
	});

	// Register a different event
	myObject.on('yourEvent', function() {
	    console.log('yourEvent fired');
	});

	// Trigger the new event
	myObject.trigger('yourEvent');

	// Trigger all existing events using a special
	// "star" identifier.
	myObject.trigger('*');

	// Remove one event by name
	myObject.off('myEvent');

	// Since we've removed the event, this should
	// do nothing
	myObject.trigger('myEvent');

	// Remove all existing events
	myObject.off();

	// Since we've removed all events, this should
	// do nothing
	myObject.trigger('*');

}).listen(8080);