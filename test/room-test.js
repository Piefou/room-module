var assert = require('assert');
var Room = require('../lib/room').Room;

describe('Room', function(){
  
  describe('#Constructor()', function() {
    it('should be an instance of Room', function(){
		var room = new Room();
		assert.ok(room instanceof Room, "room is not an instance of Room");
    });
  });
  
  describe('#getToken', function() {
	it('should have a token generate on 16 digits', function() {
		var room = new Room();
		assert.ok(room.getToken().length == 16, "token is not on 16 digits");
	});
  });
  
  describe('#setMaxNbMembers', function() {
	it('should set maxNbMembers to 10', function() {
		var room = new Room();
		room.setMaxNbMembers(10);
		assert.ok(room.getMaxNbMembers() == 10, "maxNbMembers is not set to 10");
	});
  });
  
  describe('#setMinNbMembers', function() {
	it('should set minNbMembers to 4', function() {
		var room = new Room();
		room.setMinNbMembers(4);
		assert.ok(room.getMinNbMembers() == 4, "minNbMembers is not set to 4");
	});
  });
  
  describe('#setMaxNbMembers', function() {
	it('should throw exception', function() {
		var room = new Room();
		room.setMinNbMembers(4)

		assert.throws(function() { room.setMaxNbMembers(3); }, /supérieur/, "maxNbMembers is inferior to minNbMembers");
	});
  });
  
  describe('#setMinNbMembers', function() {
	it('should throw exception', function() {
		var room = new Room();
		room.setMaxNbMembers(10)

		assert.throws(function() { room.setMinNbMembers(11); }, /inférieur/, "minNbMembers is superior to maxNbMembers");
	});
  });
  
  describe('#open', function() {
	it('should open the room', function() {
		var room = new Room();
		room.open();
		assert.ok(room.isOpen() == true, "room is not open");
	});
  });
  
  describe('#close', function() {
	it('should close the room', function() {
		var room = new Room();
		room.open();
		room.close();
		assert.ok(room.isClosed() == true, "room is not closed");
	});
  });
  
  describe('#open', function() {
	it('should open the room', function() {
		var room = new Room();
		room.open();
		assert.ok(room.isOpen() == true, "room is not open");
	});
  });
  
  describe('#memberJoin', function() {
	it('should have a member', function() {
		var room = new Room();
		room.open();
		var member = room.memberJoin();
		assert.ok(room.getMembers().length == 1, "room have not a member");
	});
  });
    
  describe('#memberJoin', function() {
	it('should have not a member', function() {
		var room = new Room();
		room.open();
		room.setMaxNbMembers(3);
		room.members = ["One", "Two", "Three"];
		var res = room.memberJoin();
		assert.ok((room.getMembers().length == 3 && res == false), "room have not a member");
	});
  });
  
  describe('#memberLeave', function() {
	it('should leave a member', function() {
		var room = new Room();
		room.open();
		var memberOne = room.memberJoin();
		var memberTwo = room.memberJoin();
		var memberThree = room.memberJoin();
		var res = room.memberLeave(memberTwo);
		assert.ok((room.getMembers().length == 2 && res == true), "the member did not leave the room");
	});
  });
  
  describe('#memberLeave', function() {
	it('should throw a exception', function() {
		var room = new Room();
		room.open();
		var memberOne = room.memberJoin();
		var memberTwo = room.memberJoin();
		var memberThree = room.memberJoin();
		var memberFour = "dummy"
		assert.throws(function() { room.memberLeave(memberFour); }, /n'est pas/, "the member is in the romm");
	});
  });
    
  describe('#getMember', function() {
	it('should return the member', function() {
		var room = new Room();
		room.open();
		var memberOne = room.memberJoin();
		var memberTwo = room.memberJoin();
		var memberThree = room.memberJoin();
		assert.ok(room.getMember(memberOne).token == memberOne, "the member is not returned");
	});
  });  
    
});