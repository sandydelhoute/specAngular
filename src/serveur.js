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
let listUsers = [];
let listRoles = [
{
	roleName : 'Loup Garou',
	carte : '/assets/cartes/loupGarou.jpg',
	visible : true,
	max     : 0.5
},
{
	roleName : 'Ancien',
	carte : '/assets/cartes/ancien.JPG',
	visible : true,
	max     : 1
},
{
	roleName : 'Bouc Emissaire',
	carte : '/assets/cartes/boucEmissaire.jpg',
	visible : true,
	max     : 1
},
{
	roleName : 'Chasseur',
	carte : '/assets/cartes/chasseur.jpg',
	visible : true,
	max     : 1
},
{
	roleName : 'Cupidon',
	carte : '/assets/cartes/cupidon.jpg',
	visible : true,
	max     : 1
},
{
	roleName : 'Idiot',
	carte : '/assets/cartes/idiot.jpg',
	visible : true,
	max     : 1
},
{
	roleName : 'Joueur de Flûte',
	carte : '/assets/cartes/joueurFlute.jpg',
	visible : true,
	max     : 1
},
{
	roleName : 'Maire',
	carte : '/assets/cartes/maire.jpg',
	visible : true,
	max     : 1
},
{
	roleName : 'Petit Fille',
	carte : '/assets/cartes/petiteFille.jpg',
	visible : true,
	max     : 1
},
{
	roleName : 'Salvateur',
	carte : '/assets/cartes/salvateur.jpg',
	visible : true,
	max     : 1
},
{
	roleName : 'Sorcière',
	carte : '/assets/cartes/sorciere.jpg',
	visible : true,
	max     : 1
},
{
	roleName : 'Villageois',
	carte : '/assets/cartes/villageois.jpg',
	visible : true,
	max     : null
},
{
	roleName : 'Voleur',
	carte : '/assets/cartes/voleur.jpg',
	visible : true,
	max     : 1
},
{
	roleName : 'Voyante',
	carte : '/assets/cartes/voyante.jpg',
	visible : true,
	max     : 1
},
];



io.sockets.on('connection', function (socket) {

// AJOUT USERS 
socket.on('addPlayer',(playerName)=>{
	var usersNameUsed = false;
	listUsers.map(function(player){
		if(playerName == player.name)
		{
			usersNameUsed=true;
		}

	})
	if(!usersNameUsed){
		listUsers.push({'name':playerName,'id':socket.id});
		socket.emit("accesChannel",{'name':playerName,'id':socket.id});

	}
	else
	{
		socket.emit('noAccesChannel');
	}
});




// CREATION D UN CHANNEL
socket.on('createChannel',(channelName,userName)=>{
	console.log("je suis dnas le create channel");
	var existChannelName = false;
	var listPlayer=[];

	listChannel.map(function(channel){
		if(channelName == channel.name)
		{
			existChannelName = true;
		}

	})
	if(!existChannelName){
		var player={id:socket.id,name:userName,isMaster:true,isReady:false};
		channel=
		{	
			name:channelName,
			limitPlayer:15,
			minPlayer:6,
			id:listChannel.length,
			partie:{status:false},
			message:{
				all:[{}],
				loup:[{}],
				vilagois:[{}]
			}
		};
		player.role=setRandomRole(channel.minPlayer,listPlayer);
		listPlayer.push(player);
		channel.nbrPlayer=listPlayer.length;
		channel.listPlayer=listPlayer;
		listChannel.push(channel);
		socket.join(channelName);
		socket.emit('statusCreateChannel',{create:true,name:channelName});
		socket.broadcast.emit('listChannel',listChannel);
	}
	else
	{
		socket.emit('statusCreateChannel',{create:false});
	}
});

socket.on('callListChannel',()=>{
	io.emit('listChannel',listChannel);
});


// JOIN CHANNEL
socket.on('joinChannel',(channelName,userName)=>{
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
				var user={id:socket.id,name:userName,isMaster:false,isReady:false};
				user.role=setRandomRole(channel.minPlayer,channel.listPlayer);
				channel.listPlayer.push(user);
				channel.nbrPlayer=channel.listPlayer.length;
				socket.broadcast.emit('listChannel',listChannel);
				socket.emit('accessJoinChannel',{access:true, name:channelName,user:user});
			}
		}
	});
});



//INFORMATION CHANNEL AFTER JOIN
socket.on('getChannel',function(channelName){
	listChannel.map(function(channel){
		if(channel.name == channelName){
			socket.join(channel.name);
			socket.emit('setChannel',channel);
			socket.broadcast.to(channel.name).emit('setChannel',channel);
		}
	});


});
// IS READY IN CHANNEL
socket.on('setReady',function(userInput,channelInput){
	console.log(" je suis dans le setReady");
	listChannel.map(function(channel){
		if(channel.name == channelInput.name)
		{
			channel.listPlayer.map(function(user)
			{

				if(user.name == userInput.name)

				{
					console.log(" je suis le bon user")
					user.isReady=true;
				}
			});

		}
	});
	socket.emit('updateChannel',channel);
	socket.to(channel.name).emit('updateChannel',channel);
});


socket.on('callLaunchGame',function(channelName){
	console.log("je suis dans le callLaunchGame");
	/*listChannel.map(function(channel){
		if(channelName == channel.name){
			socket.broadcast.to(channel.name).emit('launchGame',{name:channel.name,status:true});
		}
	});*/
});


// TCHAT
socket.on('addmessage',function(message,channelInput){

	listChannel.map(function(channel){

		if(channel.name == channelInput.name)
		{
			channel.message.all.push(message);
			io.emit('newmessage',{message:message});
			socket.to(channel.name).emit('newmessage',{message:message});
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
	if(typeof listPlayer != "undefined" )
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