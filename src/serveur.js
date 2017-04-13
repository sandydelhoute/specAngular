const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
http.listen(PORT, () => console.log('Le serveur a demaré'));


const listChannel=[];
const listUsers = [];
const roles = [
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
    roleName : 'Loup Garou',
    carte : '/assets/cartes/loupGarou.jpg',
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
        var usersNameUsed=false;
        listUsers.map(function(player){
            if(playerName == player.name)
            {
                console.log('userexist');
                usersNameUsed=true;
            }
            else
            {
                console.log('usersnoexist');
                usersNameUsed = false;
            }

        })
        if(!usersNameUsed){
            console.log('acces');
            listUsers.push({'name':playerName,'id':socket.id});
            socket.emit("accesChannel");

        }
        else
        {
            console.log('error');
            socket.emit('noAccesChannel');
        }
    });

    socket.on('createChannel',(channelName)=>{
        var existChannelName;
        var listPlayer=[];

        listChannel.map(function(channel){
            if(channelName == channel.name)
            {
                existChannelName = true;
            }
            else
            {
                existChannelName = false;
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
            listPlayer.push(socket.id);
            listChannel.push({name:channelName,nbrPlayer:listPlayer.length,limitPlayer:15,listPlayer:listPlayer,id:listChannel.length,partie:{status:false}});
            socket.emit('statusCreateChannel',true);      
        }
        else
        {
            console.log("Error Create Channel")
            socket.emit('statusCreateChannel',false);
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
        if(currentChannel.nbrPlayer >= currentChannel.limitPlayer)
        {
            socket.emit('accessJoinChannel',{access:false,msg:'le channel est complet'});
        }
        else if(currentChannel.partie.status)
        {
            socket.emit('accessJoinChannel',{access:false,msg:'partie déjâ en cours'});
        }
        else
        {
            currentChannel.listPlayer.push(socket.id);
            socket.emit('accessJoinChannel',{access:true});
        }


    });
    socket.on('addmessage',function(message){
    	console.log(message);
        io.emit('newmessage',message);
    });

});