var assert = require('assert');
var manager = require('../lib/manager').RoomManager;
var Room = require('../lib/room').Room;

describe('RoomManager', function() {

	var token;

	describe('#newRoom', function() {
		it('should create a new room', function() {
			token = manager.newRoom();
			assert.ok(token.length == 16 && manager.rooms.length == 1, "the room is not created");
		});
	});

	describe('#getRoom', function() {
		it('should return the room of the specified token', function() {
			assert.ok(manager.getRoom(token) instanceof Room, "the room is not returned");
		});
	});
	
	describe('#deleteRoom', function() {
		it('should delete the room of the specified token', function() {
			var res = manager.deleteRoom(token);
			assert.ok(res == true, "the room is not deleted");
		});
	});	
	
	describe('#getRoom', function() {
		it('should not return any room', function() {
			assert.ok(manager.getRoom("dummy") == false, "a room is returned");
		});
	});
	
	describe('#deleteRoom', function() {
		it('should not delete any room', function() {
			var res = manager.deleteRoom("dummy");
			assert.ok(res == false, "a room is deleted");
		});
	});

});