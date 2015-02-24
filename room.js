var randtoken = require('rand-token');

/*
 * Objet représentant une salle.
 */
function Room() {
	this.name = "";
	this.token = randtoken.generate(16);
	this.members = [];
	this.maxNbMembers = 30;
	this.minNbMembers = 0;
	this.openState = false;
	this.uniqueAttr = "";
}

/*
 * Retourne le nom de la salle.
 * @return string
 */
Room.prototype.getName = function() {
	return this.name;
}

/*
 * Valorise le nom de la salle.
 * @param name le nouveau nom de la salle
 */
Room.prototype.setName = function(name) {
	this.name = name;
}

/*
 * Retourne l'attribut unique identifiant les membres de la salle.
 * @return string
 */
Room.prototype.getUniqueAttr = function() {
	return this.uniqueAttr;
}

/*
 * Valorise l'attribut unique identifiant les membres de la salle.
 * @param attr le nouveau attribut unique
 */
Room.prototype.setUniqueAttr = function(attr) {
	this.uniqueAttr = attr;
}

/*
 * Retourne le token, identifiant unique de la salle, généré aléatoirement à l'instanciation de la salle.
 * @return string
 */
Room.prototype.getToken = function() {
	return this.token;
}

/*
 * Retourne le tableau des membres de la salle
 * @return array.
 */
Room.prototype.getMembers = function() {
	return this.members;
}

/*
 * Retourne le nombre maximum de membres autorisés dans cette salle
 * @return integer.
 */
Room.prototype.getMaxNbMembers = function() {
	return this.maxNbMembers;
}

/*
 * Retourne le nombre minimum de membres autorisés dans cette salle
 * @return integer.
 */
Room.prototype.getMinNbMembers = function() {
	return this.minNbMembers;
}

/*
 * Valorise le nombre maximum de membres autorisés dans cette salle
 * @param integer
 */
Room.prototype.setMaxNbMembers = function(maxNb) {
	if(maxNb < this.minNbMembers)
		throw "maxNbMembers doit être supérieur ou égal à minNbMembers";
	else
		this.maxNbMembers = maxNb;
}

/*
 * Valorise le nombre minimum de membres autorisés dans cette salle
 * @param integer
 */
Room.prototype.setMinNbMembers = function(minNb) {
	if(minNb > this.maxNbMembers)
		throw "minNbMembers doit être inférieur ou égal à maxNbMembers";
	else
		this.minNbMembers = minNb;
}

/*
 * Ouvre la salle.
 */
Room.prototype.open = function() {
	this.openState = true;
}

/*
 * Ferme la salle.
 */
Room.prototype.close = function() {
	this.openState = false;
}

/*
 * Vide la salle de tout ses membres.
 */
Room.prototype.clean = function() {
	this.members = [];
}

/*
 * Ajoute un membre à la salle, si sa capacité maximale n'a pas été atteinte et si elle est ouverte.
 * @param le nouveau membre à ajouter.
 * @return boolean true si le membre est ajouté, false sinon.
 */
Room.prototype.memberJoin = function(newMember) {
	var res;	
	if(res = (!this.isFull() && this.isOpen()))
		this.members.push(newMember);

	return res;
}

/*
 * Ajoute un membre à la salle, si sa capacité maximale n'a pas été atteinte.
 * @param le membre à enlever de la salle.
 * @return boolean true si le membre a quitté la salle
 */
Room.prototype.memberLeave = function(oldMember) {
	var index;
	if((index = this.indexMember(oldMember)) != -1)
		this.members.splice(index, 1);
	else
		throw "Le membre n'est pas dans cette salle.";
		
	return index;
}

/*
 * Indique si la salle est ouverte
 * @return boolean true si la salle est ouverte, false si elle est fermée.
 */
Room.prototype.isOpen = function() {
	return this.openState;
}

/*
 * Indique si la salle est fermée, complément de la méthode "isOpen"
 * @return boolean true si la salle est fermée, false si elle est ouverte.
 */
Room.prototype.isClosed = function() {
	return !this.openState;
}

/*
 * Indique si la salle a atteinte sa capacité maximale.
 * @return boolean true si le nombre de membres est supérieur ou égal au nombre maximum de membres autorisé, false sinon.
 */
Room.prototype.isFull = function() {
	return (this.members.length >= this.maxNbMembers);
}

/*
 * Indique si la salle n'a pas atteinte sa capacité minimale.
 * @return boolean true si le nombre de membres est inférieur au nombre minimum de membres autorisé, false sinon.
 */
Room.prototype.notEnough = function() {
	return (this.members.length < this.minNbMembers);
}

/*
 * Indique si le membre est dans la salle.
 * @param le membre à vérifier.
 * @return integer index du membre dans la salle, -1 si absent.
 */
Room.prototype.indexMember = function(member) {
	if(this.uniqueAttr.length > 0)
	{
		for(var i=0; i<this.members.length; i++)
		{
			if(this.members[i][this.uniqueAttr] == member)
				return i;
		}
	}
	else
	{
		for(var i=0; i<this.members.length; i++)
		{
			if(this.members[i] == member)
				return i;
		}
	}
	
	return -1;
}

/*
 * Récupère le membre dans la salle.
 * @param le membre à récupérer.
 * @return object membre de la salle
 */
Room.prototype.getMember = function(member) {
	var index;
	if((index = this.indexMember(member)) != -1)
		return this.members[index];
	else
		throw "Le membre n'est pas dans cette salle.";
}

exports.Room = Room;