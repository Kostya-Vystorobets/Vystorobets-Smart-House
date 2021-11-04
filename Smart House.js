"use strict"
//Система умного дома. Управление компонентами: увлажнитель воздуха и обогреватель.  
// Класс родитель Device.
class Device {
	constructor(name) {
		this._name = name;         			
		this._state = false;   
		this._power = [];
		this._сorrentPower = 0;
	}
	get name() {
		return this._name;
	}
	get state() {
		return this._state;
	}
	get power() {
		return this._power[this._сorrentPower];
	}
	set name(value) {
		if(typeof value === "string" && value.length >= 2 && value.length <= 20) {
			this._name = value;
		}
	}
	onState() {
		this._state = true;
	}
	offState() {
		this._state = false;
	}
	morePower() {
		if (this._сorrentPower < this._power.length) {
			this._сorrentPower++;
		}
	}	
	lessPower() {
		if (this._сorrentPower > 0) {
			this._сorrentPower--;
		}
	}
}

// Класс устройства AirHumidifier, наследник.
class AirHumidifier extends Device {
	constructor(name) {
		super(name);
		this._humidity = 50;            	
		this._power = ["low", "medium", "high", "turbo"];	
	}
	get humidity() {
	return this._humidity;
	}
	set humidity(value) {
		if(typeof value === "number" && value >= 20 && value <= 100) {
			this._humidity = value;
		}
	}
}

// Класс устройства Heater, наследник.
class Heater extends Device {
	constructor(name) {
		super(name);		
		this._temperature  = 22;            	
		this._power = ["0.75kW.h", "1.5kW.h", "3kW.h"];
	}
	get temperature() {
		return this._temperature;
	}
	set temperature(value) {
		if(typeof value === "number" && value >= 10 && value <= 50) {
			this._temperature = value;
		}
	}
}

// Класс  SmartHouse.
class SmartHouse {
	constructor(name) {
		this._name = name;
		this._devices = [];
	}	
	get name() {
		return this._name;
	}
	addDevice(device) {
		this._devices.push(device);
	}
	get devices() {
		return this._devices;
	}
	getDeviceByName(name) {
		let arrNames = this._devices.map((value) => value.name);
		let i = arrNames.indexOf(name);
			return this._devices[i];
	}
	deleteDeviceByName(name) {
		this._devices = this._devices.filter((value) => name !== value.name);
	}
	onAllDevice() {
		this._devices.forEach((value) => {
			value.onState();
		});
	}
	offAllDevice() {
		this._devices.forEach((value) => {
			value.offState();
		});
	}
}