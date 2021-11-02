"use strict"
//Система умного дома. Управление компонентами: увлажнитель воздуха и обогреватель.  

// Класс родитель Device

function Device (name) {
	this._name = name;         			
	this._state = false;   
	this._power = [];
	this._сorrentPower = 0;
}
Device.prototype.getName = function() {
	return this._name;
};
Device.prototype.getState = function() {
	return this._state;
};
Device.prototype.getPower = function() {
	return this._power[this._сorrentPower];
};
Device.prototype.setName = function(value) {
	if(typeof value === "string" && value.length >= 2 && value.length <= 20) {
		this._name = value;
	}
};
Device.prototype.onState = function() {
	this._state = true;
};
Device.prototype.offState = function() {
	this._state = false;
};
Device.prototype.morePower = function() {
	if (this._сorrentPower < this._power.length) {
		this._сorrentPower++;
	}
};
Device.prototype.lessPower = function() {
	if (this._сorrentPower > 0) {
		this._сorrentPower--;
	}
};


// Класс устройства AirHumidifier, наследник.
function AirHumidifier(name) {
	Device.call(this, name);
	this._humidity = 50;            	
	this._power = ["low", "medium", "high", "turbo"];
	
};
AirHumidifier.prototype = Object.create(Device.prototype);
AirHumidifier.prototype.constructor = AirHumidifier;

AirHumidifier.prototype.getHumidity = function() {
	return this._humidity;
};
AirHumidifier.prototype.setHumidity = function(value) {
	if(typeof value === "number" && value >= 20 && value <= 100) {
		this._humidity = value;
	}
};

// Класс устройства Heater, наследник.
function Heater(name) { 
  	Device.call(this, name);		
	this._temperature  = 22;            	
	this._power = ["0.75kW.h", "1.5kW.h", "3kW.h"];
};
Heater.prototype = Object.create(Device.prototype);
Heater.prototype.constructor = Heater;

Heater.prototype.getTemperature = function() {
	return this._temperature;
	}
	
Heater.prototype.setTemperature = function(value) {
	if(typeof value === "number" && value >= 10 && value <= 50) {
		this._temperature = value;
	}
};


// Класс  SmartHouse.
function SmartHouse (name) {
	this._name = name;
	this._devices = [];
};
SmartHouse.prototype.getName = function() {
	return this._name;
};
SmartHouse.prototype.addDevice = function(device) {
	this._devices.push(device);
};
SmartHouse.prototype.getDevices = function() {
	return this._devices;
};
SmartHouse.prototype.getDeviceByName = function(name) {
	var arrNames = this._devices.map(function (value) {
        return value.getName();
    });
    var i = arrNames.indexOf(name);
		return this._devices[i];
};
SmartHouse.prototype.deleteDeviceByName = function(name) {
	this._devices = this._devices.filter(function (value) {
		return name !== value.getName();		
	});
};
SmartHouse.prototype.onAllDevice = function() {
	this._devices.forEach(function (value) {
		value.onState();
	});
};
SmartHouse.prototype.offAllDevice = function() {
	this._devices.forEach(function (value) {
		value.offState();
	});
};

