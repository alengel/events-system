var assert = require('assert'),
	events = require('../events');

describe('the event system', function() {
  	describe('the events list', function() {
  		it('should initialize an object', function() {
  	   		//Assert
  	   		assert.equal(typeof Object.prototype.events, 'object');
  		});
  	});

  	describe('the on function', function() {
  		var testObject;

  		beforeEach(function() {
  			testObject = {};
  			testObject.events = {};
  		});

  		it('should add the passed event and callback to the events list', function() {
  			//Arrange
  			var callback = function(){};

  			//Act
  			testObject.on('testEvent', callback);

  			//Assert
  			assert.equal(Object.keys(testObject.events).length, 1);
  			assert.notEqual(testObject.events.testEvent, undefined);
  			assert.equal(testObject.events.testEvent, callback);
  		});

  		it('should overwrite the event if it already exists', function() {
  			//Arrange
  			var callbackOne = function(){},
  				callbackTwo = function(){};

  			//Act
  			testObject.on('testEvent', callbackOne);
  			testObject.on('testEvent', callbackTwo);

  			//Assert
  			assert.equal(testObject.events.testEvent, callbackTwo);
  		});

  		it('should not register the event if there is no passed callback', function() {
  			//Act
  			testObject.on('eventWithoutCallback');

  			//Assert
  			assert.equal(testObject.events.eventWithoutCallback, undefined);
  		});

  		it('should not register the event if the callback is not a function', function() {
  			//Arrange
  			var callback = 'fooBar';

  			//Act
  			testObject.on('fooBarEvent', callback); 

  			//Assert
  			assert.equal(testObject.events.fooBarEvent, undefined);
  		});
  	});

  	describe('the trigger function', function() {
  		var testObject;

  		beforeEach(function() {
  			testObject = {};
  			testObject.events = {};
  		});

  		it('should call all events once if the event is "*"', function() {
  			//Arrange
  			var functionCounterOne = 0;
  			var functionCounterTwo = 0;

  			testObject.on('eventOne', function(){
  				functionCounterOne++;
  			});

  			testObject.on('eventTwo', function(){
  				functionCounterTwo++;
  			});

  			//Act
  			testObject.trigger('*');

  			//Assert
  			assert.equal(functionCounterOne, 1);
  			assert.equal(functionCounterTwo, 1);
  		});

  		it('should call the associated callback of an event once', function() {
  			//Arrange
  			var callbackCounter = 0;

  			testObject.on('eventFoo', function(){
  				callbackCounter++;
  			});

  			//Act
  			testObject.trigger('eventFoo');

  			//Assert
  			assert.equal(callbackCounter, 1);
  		});

  		it('passes the data to the callback', function() {
  			//Arrange
  			var verifiedData,
  				fakeData = {
  					foo: 'bar'
  				};

  			testObject.on('eventBar', function(data){
  				verifiedData = data;
  			});

  			//Act
  			testObject.trigger('eventBar', fakeData);

  			//Assert
  			assert.equal(verifiedData, fakeData);
  		});

  		it('should not trigger the event if it is not registered', function() {
  			var verifyRegistration = false;

  			//Arrange
  			testObject.on('registeredEvent', function(){
  				verifyRegistration = true;
  			});

  			//Act
  			testObject.trigger('unregisteredEvent');

  			//Assert
  			assert.equal(verifyRegistration, false);
  		});
  	});

  	describe('the off function', function() {
  		var testObject;

  		beforeEach(function() {
  			testObject = {};
  			testObject.events = {};

  			//Arrange
  			testObject.on('eventOne', function(){});
  			testObject.on('eventTwo', function(){});
  		});

  		it('should reset the events list if no event is passed in', function() {
  			//Act
  			testObject.off();

  			//Assert
  			assert.equal(Object.keys(testObject.events).length, 0);
  		});

  		it('should remove the passed in event from the events list', function() {
  			//Act
  			testObject.off('eventTwo');

  			//Assert
  			assert.equal(Object.keys(testObject.events).length, 1);
  			assert.notEqual(testObject.events.eventOne, undefined);
  		});
  	});
});