const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;


app.use(express.static(__dirname));
http.listen(PORT, () => console.log(`Le serveur a demaré,listing in ${PORT}`));
//http.listen(80, () => console.log(`Le serveur a demaré,listing in ${PORT},sandy`));
let nbLoups = 0;
let listChannel=[];
let listAllPlayer = [];
let listRoles = [
{
	id:1,
	name : 'Loup Garou',
	carte : '/assets/cartes/loupGarou.jpg',
	visible : true,
	probability     : 0.5
},
{	
	id:2,
	name : 'Ancien',
	carte : '/assets/cartes/ancien.JPG',
	visible : true,
	probability     : 1
},
{	
	id:3,
	name : 'Bouc Emissaire',
	carte : '/assets/cartes/boucEmissaire.jpg',
	visible : true,
	probability     : 1
},
{	
	id:4,
	name : 'Chasseur',
	carte : '/assets/cartes/chasseur.jpg',
	visible : true,
	probability     : 1
},
{	
	id:5,
	name : 'Cupidon',
	carte : '/assets/cartes/cupidon.jpg',
	visible : true,
	probability     : 1
},
{	
	id:6,
	name : 'Idiot',
	carte : '/assets/cartes/idiot.jpg',
	visible : true,
	probability     : 1
},
{	
	id:7,
	name : 'Joueur de Flûte',
	carte : '/assets/cartes/joueurFlute.jpg',
	visible : true,
	probability     : 1
},
{
	id:8,
	name : 'Maire',
	carte : '/assets/cartes/maire.jpg',
	visible : true,
	probability     : 1
},
{	
	id:9,
	name : 'Petit Fille',
	carte : '/assets/cartes/petitefille.jpg',
	visible : true,
	probability     : 1
},
{	
	id:10,
	name : 'Salvateur',
	carte : '/assets/cartes/salvateur.jpg',
	visible : true,
	probability     : 1
},
{	
	id:11,
	name : 'Sorcière',
	carte : '/assets/cartes/sorciere.jpg',
	visible : true,
	probability     : 1
},
{	
	id:12,
	name : 'Villageois',
	carte : '/assets/cartes/villageois.jpg',
	visible : true,
	probability     : 0.5
},
{	
	id:13,
	name : 'Voleur',
	carte : '/assets/cartes/voleur.jpg',
	visible : true,
	probability     : 1
},
{	
	id:14,
	name : 'Voyante',
	carte : '/assets/cartes/voyante.jpg',
	visible : true,
	probability     : 1
},
];



io.sockets.on('connection', function (socket) {

// create USERS 
socket.on('createPlayer',(player)=>{
	console.log("je suis dnas le create player");
	console.log(typeof player);
	console.log(player);

	var usersIdUsed = false;
	listAllPlayer.map(function(playerList){
		if(player.id == playerList.id)
		{
			usersNameUsed=true;
		}

	});
	if(!usersIdUsed){
		player.id=socket.id;
		listAllPlayer.push(player);
		socket.emit("accesChannel",{ statusAcces :true ,player: player});
		socket.emit("setPlayer",player);
		console.log(player)
	}
	else
	{
		socket.emit('noAccesChannel');
	}
});

// return information player in listPlayer
socket.on('getPlayer',(playerId,channel = null)=>{
	let player;
	console.log(channel);
	if(channel !== null){
		listChannel.map((channelList)=>{

			if(channelList.name === channel.name )
			{
				channel = channelList;
				channel.listPlayer.map((playerList)=>{
					if(playerList.id === playerId){		
						player = playerList;
					}
				});
			}

		});
	}
	else{
		listAllPlayer.map((playerList)=>{
			if(playerList.id === playerId){		
				player = playerList;
			}
		});
		
	}
	socket.emit('setPlayer',player);
	
});

// CREATION D UN CHANNEL
socket.on('createChannel',(channelInput,playerInput)=>{
	var existChannelName = false;
	listChannel.map(function(channel){
		if(channelInput.name == channel.name)
		{
			existChannelName = true;
		}
	})	
	if(!existChannelName){

		channelInput.id=listChannel.length;
		channelInput.limitPlayer=15;
		channelInput.minPlayer=6;
		channelInput.partie={status:false};
		channelInput.listMessageAll=[];
		channelInput.listMessageLoup=[];
		channelInput.listPlayer=[];
		playerInput.role=setRandomRole(channelInput.minPlayer,channelInput.listPlayer);
		playerInput.isReady = false;
		playerInput.isMaster= true;
		channelInput.nbrPlayer=channelInput.listPlayer.length;
		channelInput.listPlayer.push(playerInput);
		listChannel.push(channelInput);
		socket.join(channelInput.name);
		socket.emit('statusCreateChannel',{create:true,channel:channelInput});
		socket.broadcast.emit('listChannel',listChannel);
	}
	else
	{
		socket.emit('statusCreateChannel',{create:false});
	}
});


// Retrun list with all channel in serveur
socket.on('callListChannel',()=>{
	io.emit('listChannel',listChannel);
});


// JOIN CHANNEL 
socket.on('joinChannel',(channelName,player)=>{
	console.log('je suis dans je join channel ')
	console.log(channelName)
	listChannel.map(function(channel){
		if(channelName == channel.name)
		{

			if(channel.nbrPlayer >= channel.limitPlayer)
			{
				socket.emit('accessJoinChannel',{access:false,msg:'Le channel est complet'});
			}
			else if(channel.partie.status)
			{
				socket.emit('accessJoinChannel',{access:false,msg:'La partie est déjâ en cours'});
			}
			else
			{
				player.isMaster=false,
				player.isReady=false;
				player.role=setRandomRole(channel.minPlayer,channel.listPlayer);
				channel.listPlayer.push(player);
				channel.nbrPlayer=channel.listPlayer.length;
				socket.broadcast.emit('listChannel',listChannel);
				socket.emit('accessJoinChannel',{access:true, name:channelName,user:player});
			}
		}
	});
});



//INFORMATION CHANNEL AFTER JOIN
socket.on('getChannel',function(channelInput){
	var channelReturn = null;
	if(listChannel.length == 0){
		socket.emit('updateChannel',null);
	}
	else{
		listChannel.map(function(channel){
			if(channel.name == channelInput.name){
				channelReturn = channel;
				console.log(channelReturn)
			}
		});
		if(channelReturn != null){
			socket.join(channelReturn.name);
			socket.emit('updateChannel',channelReturn);
			socket.broadcast.to(channelReturn.name).emit('updateChannel',channelReturn);
		}
		else{
			socket.emit('updateChannel',null);
		}

	}

});

// IS READY IN CHANNEL
socket.on('setReady',function(userInput,channelInput){
	var allReady = 0;
	var channelReturn;
	listChannel.map(function(channel){
		channelReturn = channel;
		if(channel.name == channelInput.name)
		{
			channel.listPlayer.map(function(user)
			{
				if(user.name == userInput.name & !user.isReady)
				{
					user.isReady=true;
					console.log(user);
					allReady ++;
				}
				if(allReady >= channel.minPlayer)
				{
					socket.to(channel.name).emit('allReady',channel);
				}
			});	
		}
	});
	socket.emit('updateChannel',channelReturn);
	socket.to(channelReturn.name).emit('updateChannel',channelReturn);
});


socket.on('callLaunchGame',function(channelName){
	console.log("je suis dans le callLaunchGame");
	listChannel.map(function(channel){
		if(channelName == channel.name){
			socket.to(channel.name).emit('launchGame',channel);
			socket.emit('launchGame',channel);
		}
	});
});


// add Message in tchat
socket.on('addmessage',function(message,channelInput){



	listChannel.map(function(channel){

		if(channel.name == channelInput.name)
		{
			channel.listMessageAll.push(message);
			channel.listMessageAll.sort((a,b)=>{
				if (a.datePublish<b.datePublish)
					return 1;
				else if(a.datePublish >b.datePublish)
					return -1;
				else
					return 0;
			});
			console.log(channel.listMessageAll);
			io.emit('newmessage',channel.listMessageAll);
			socket.to(channel.name).emit('newmessage',channel.listMessageAll);
		}

	});
})

//disconnect
socket.on('disconnect', function(data){

	console.log("voila la data"+data);
	/*listChannel.map(function(channel){
		channel.players.map(function(player)
		{	

		});
	});*/
});

});



// GESTION DES ROLES DES PLAYERS
function setRandomRole(minPlayer,listPlayer){
	var currentListPlayer=[];
	if(typeof listPlayer !== "undefined" )
	{
		var currentListPlayer=listPlayer;
	}

	var newRole = listRoles[Math.floor(Math.random()*listRoles.length)];

    if(newRole.visible != true){ //Si on tombe sur un role non utilisé
    	newRole =  this.setRandomRole(minPlayer,listPlayer);
    }

    if(newRole.roleName == 'Loup Garou'){
    	nbLoups += 1;

        var maxLoups = Math.round(this.nbPlayers * listRoles[0].max); //Recup du nombre maxi de loups  

        if(nbLoups > maxLoups){
        	newRole = this.setRandomRole(minPlayer,listPlayer);
        }

    } else if(newRole.roleName != 'Villageois'){ //Maxi 1 joueur des autres roles

    	var isAvailable = true;
    	listPlayer.map(function(player){
    		if(player.role == newRole.roleName)
    			isAvailable = false;
    	});

    	if(isAvailable != true) {
    		newRole =  this.setRandomRole(minPlayer,listPlayer);
    	}
    } else if((currentListPlayer.length >= minPlayer) && (this.nbLoups == 0) && (newRole.roleName != 'Loup Garou')){
        newRole = this.setRandomRole(minPlayer,listPlayer); //Pour avoir au moins 1 loup si + de minPlayers joueurs
    }

    return newRole;

}
