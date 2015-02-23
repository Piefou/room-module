var Room = require('./room');

/*
 * Gestionnaire des salles.
 */
var RoomManager = {
	rooms : [],
	getRoom : function(token) {
		for(var i=0; i<rooms.length; i++)
		{
			if(rooms[i].getToken == token)
				return rooms[i];
		}
		
		return false;
	},
	
	newRoom : function(name) {
		var room = new Room(name);
		rooms.push(room);
		return room.getToken();
	}
	
	deleteRoom : function(token) {
		var room = getRoom(token);
		room.close();
		room.clean();
		
		for(var i=0; i<rooms.length; i++)
		{
			if(rooms[i].getToken == token)
			{
				rooms[i].splice(i, 1);
				return true;
			}	
		}
		
		return false;
	}
}
