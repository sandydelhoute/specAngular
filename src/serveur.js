const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
http.listen(PORT, () => console.log('Le serveur a demaré'));

let nbLoups = 0;
let listChannel=[];
let listUsers = [];
let listRoles = [
{
    roleName : 'Loup Garou',
    carte : '/assets/cartes/loupGarou.jpg',
    visible : true,
},
{
    roleName : 'Ancien',
    carte : '/assets/cartes/ancien.JPG',
    visible : true,
},
{
    roleName : 'Bouc Emissaire',
    carte : '/assets/cartes/boucEmissaire.jpg',
    visible : true,
},
{
    roleName : 'Chasseur',
    carte : '/assets/cartes/chasseur.jpg',
    visible : true,
},
{
    roleName : 'Cupidon',
    carte : '/assets/cartes/cupidon.jpg',
    visible : true,
},
{
    roleName : 'Idiot',
    carte : '/assets/cartes/idiot.jpg',
    visible : true,
},
{
    roleName : 'Joueur de Flûte',
    carte : '/assets/cartes/joueurFlute.jpg',
    visible : true,
},
{
    roleName : 'Maire',
    carte : '/assets/cartes/maire.jpg',
    visible : true,
},
{
    roleName : 'Petit Fille',
    carte : '/assets/cartes/petiteFille.jpg',
    visible : true,
},
{
    roleName : 'Salvateur',
    carte : '/assets/cartes/salvateur.jpg',
    visible : true,
},
{
    roleName : 'Sorcière',
    carte : '/assets/cartes/sorciere.jpg',
    visible : true,
},
{
    roleName : 'Villageois',
    carte : '/assets/cartes/villageois.jpg',
    visible : true,
},
{
    roleName : 'Voleur',
    carte : '/assets/cartes/voleur.jpg',
    visible : true,
},
{
    roleName : 'Voyante',
    carte : '/assets/cartes/voyante.jpg',
    visible : true,
},
];



io.sockets.on('connection', function (socket) {
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

    socket.on('createChannel',(channelName)=>{
        var existChannelName = false;
        var listPlayer=[];

        listChannel.map(function(channel){
            if(channelName == channel.name)
            {
                existChannelName = true;
            }

        })
        if(!existChannelName){

            /*listUsers.map(function(user){
                console.log("bloucle user");
                console.log(user);
                if(user.id == socket.id )
                {
                    listPlayer.push(user);
            }

            });*/
            var user={id:socket.id,isMaster:true,isReady:false};
            socket.join(channelName);
            channel={name:channelName,nbrPlayer:listPlayer.length+1,limitPlayer:15,minPlayer:6,listPlayer:listPlayer,id:listChannel.length,partie:{status:false}};
            user.role=setRandomRole(channel);
            listPlayer.push(user);
            listChannel.push(channel);
             console.log("create channel ");
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

    socket.on('joinChannel',(channelName)=>{
        var currentChannel;
        listChannel.map(function(channel){
            if(channelName == channel.name)
            {
                currentChannel=channel;
            }
        })
        console.log("currentChannel");
        console.log(currentChannel);
        if(currentChannel.nbrPlayer >= currentChannel.limitPlayer)
        {
            socket.emit('accessJoinChannel',{access:false,msg:'Le channel est complet'});
        }
        else if(currentChannel.partie.status)
        {
            socket.emit('accessJoinChannel',{access:false,msg:'La partie est déjâ en cours'});
        }
        else
        {
            var user={id:socket.id,isMaster:false,isReady:false};
            user.role=setRandomRole(currentChannel);
            currentChannel.listPlayer.push(user);
            socket.join(channelName);
            socket.emit('accessJoinChannel',{access:true, name:channelName});
        }



    });

    socket.on('getChannel',function(channelName){
        console.log("demande d'info channel")
        var currentChannel;
        listChannel.map(function(channel){
        
            if(channel.name == channelName){
                currentChannel=channel;
            }
        });
    socket.emit('setChannel',currentChannel);
    socket.join(channelName);
    io.to(channelName).emit('getPlayer',channel.listPlayer);

    });




    socket.on('addmessage',function(message){
        io.emit('newmessage',message);
    });

});
function setRandomRole(channel){
        if(typeof channel.listPlayer == 'undefined')
        {
            channel.listPlayers.length=0;
        }
        channel.nbrPlayer = channel.listPlayer.length + 1;

        var newRole = listRoles[Math.floor(Math.random()*listRoles.length)];

        if(newRole.visible != true){ //Si on tombe sur un role non utilisé
            newRole =  this.setRandomRole(channel);
        }

        if(newRole.roleName == 'Loup Garou'){
            nbLoups += 1;

            var maxLoups = Math.round(this.nbPlayers * listRoles[0].max); //Recup du nombre maxi de loups  

            if(nbLoups > maxLoups){
                newRole = this.setRandomRole(currentChannel);
            }

        } else if(newRole.roleName != 'Villageois'){ //Maxi 1 joueur des autres roles

            var isAvailable = true;

            channel.listPlayer.map(function(player){
                if(player.role == newRole.roleName)
                    isAvailable = false;
            });

            if(isAvailable != true) {
                newRole =  this.setRandomRole(currentChannel);
            }
        } else if((channel.listPlayers.length >= channels.minPlayer) && (this.nbLoups == 0) && (newRole.roleName != 'Loup Garou')){
            newRole = this.setRandomRole(currentChannel); //Pour avoir au moins 1 loup si + de minPlayers joueurs
        }

        return newRole;

    }