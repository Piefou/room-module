var randtoken = require('rand-token');

/*
 * Objet représentant une salle.
 */
function Room(name) {
	this.name = name;
	this.token = randtoken.generate(16);
	this.members = [];
	this.maxNbMembers = 30;
	this.minNbMembers = 0;
	this.open = false;
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
		throw "minNbMembers doit être supérieur ou égal à maxNbMembers";
	else
		this.maxNbMembers = maxNb;
}

/*
 * Ouvre la salle.
 */
Room.prototype.open = function() {
	this.open = true;
}

/*
 * Ferme la salle.
 */
Room.prototype.close = function() {
	this.open = false;
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
	if(var res = (!this.isFull() && isOpen))
		this.members.push(newMember);

	return res;
}

/*
 * Ajoute un membre à la salle, si sa capacité maximale n'a pas été atteinte.
 * @param le membre à enlever de la salle.
 */
Room.prototype.memberLeave = function(oldMember) {
	if((var index = this.indexMember(oldMember)) != -1)
		this.members.splice(index, 1);
	else
		throw "Le membre n'est pas dans cette salle.";
}

/*
 * Indique si la salle est ouverte
 * @return boolean true si la salle est ouverte, false si elle est fermée.
 */
Room.prototype.isOpen = function() {
	return this.open;
}

/*
 * Indique si la salle est fermée, complément de la méthode "isOpen"
 * @return boolean true si la salle est fermée, false si elle est ouverte.
 */
Room.prototype.isClosed = function() {
	return !this.open;
}

/*
 * Indique si la salle a atteinte sa capacité maximale.
 * @return boolean true si le nombre de membres est supérieur ou égal au nombre maximum de membres autorisé, false sinon.
 */
Room.prototype.isFull = function() {
	return (this.members.length >= maxNbMembers);
}

/*
 * Indique si la salle n'a pas atteinte sa capacité minimale.
 * @return boolean true si le nombre de membres est inférieur au nombre minimum de membres autorisé, false sinon.
 */
Room.prototype.notEnough = function() {
	return (this.members.length < minNbMembers);
}

/*
 * Indique si le membre est dans la salle.
 * @param le membre à vérifier.
 * @return integer index du membre dans la salle, -1 si absent.
 */
Room.prototype.indexMember = function(member) {
	return this.members.indexOf(member);
}

Room.prototype.getMember = function(member) {
	if((var index = this.indexMember(member)) != -1)
		return this.members[index];
	else
		throw "Le membre n'est pas dans cette salle.";
}

module.exports = Room;