var app = new Vue (
    {
        el: "#root",
        data: {
            contacts: [
                {
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Hai portato a spasso il cane?',
                            status: 'sent',
                           
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Ricordati di dargli da mangiare',
                            status: 'sent',
                           
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            text: 'Tutto fatto!',
                            status: 'received',
                           
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: '_2',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            text: 'Ciao come stai?',
                            status: 'sent',
                           
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            text: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received',
                           
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent',
                           
                        }
                    ],
                },     
                {
                    name: 'Samuele',
                    avatar: '_3',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            text: 'La Marianna va in campagna',
                            status: 'received',
                           
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            text: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent',
                           
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            text: 'Ah scusa!',
                            status: 'received',
                           
                        }
                    ],
                },
                {
                    name: 'Luisa',
                    avatar: '_4',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent',
                           
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Si, ma preferirei andare al cinema',
                            status: 'received',
                            
                        }
                    ],
                },
            ],
            activeIndex:0,
            newMessage:{
                date:"",
                text:'',
                status:'sent',
                
            },
            msgIndex: 0,
            dropdownOpen: false,
            search: "",
        },
        methods:{
            getImage: function(indexContacts){
               let imgUrl = this.contacts[indexContacts].avatar;
               return `img/avatar${imgUrl}.jpg`
            },
            setActive: function(newIndex){
                this.activeIndex = newIndex;
            },
            getLastDate: function(contact){
                return contact.messages[contact.messages.length - 1].date;
            },
            getLastDateAccess: function(contact){
                var Message = contact.messages;
                let MessageReceived = Message.filter(
                    (element) => {
                   return element.status == "received";
                }
                );
                if (MessageReceived.length > 0) {
                    let DataTime = MessageReceived[MessageReceived.length - 1].date.split(" ");
                    return DataTime[1] +" il "+ DataTime[0];
                    // return MessageReceived[MessageReceived.length - 1].date;
                } else {
                    return "";
                }
            },
            getLastMex: function(contact){
                return contact.messages[contact.messages.length - 1].text.substring(0,30)+"...";
            },
            addNewMessage: function(contact){
                if(this.newMessage.text.trim().length > 0){
                    contact.messages.push({
                        date:dayjs().format('DD/MM/YYYY HH:mm:ss'),
                        text: this.newMessage.text,
                        status:'sent'
                    })
                    setTimeout(() =>{
                        this.contacts[this.activeIndex].messages.push({
                            date:dayjs().format('DD/MM/YYYY HH:mm:ss'),
                            text: 'ok',
                            status:'received'
                        })
                    },1000); 
                   this.newMessage.text = ""; 
                }
            },
            chatContact: function(){
                var control = this.search.toLowerCase();
                console.log(control);
                this.contacts.forEach(element => {
                    if(element.name.toLowerCase().includes(control)){
                        element.visible = 'true';
                    }else{
                        element.visible = 'false';
                    }
                });
                console.log(this.contacts);
            },
            dropdownToggle: function(index) {
                this.msgIndex = index;
                this.dropdownOpen = !this.dropdownOpen;
            },
            del: function(index){
                this.contacts[this.activeIndex].messages.splice(index,1);
                console.log(this.contacts[this.activeIndex].messages);
                // this.$delete(this.contacts[this.activeIndex].messages, index);
                if (this.contacts[this.activeIndex].messages.length == 0) { 
                    this.contacts.splice(this.activeChatIndex, 1);
                }
                console.log(this.contacts[this.activeIndex].messages);
                this.dropdownOpen = false;
            },
            view: function(index){
                if(this.contacts[this.activeIndex].messages[index].status == 'received'){
                 alert(
                    `Il messaggio dice :${
                        this.contacts[this.activeIndex].messages[index].text
                    } Ricevuto il ${
                         this.contacts[this.activeIndex].messages[index].date
                    }`
                     );   
                }else{
                    alert(
                        `Il messaggio dice :${
                            this.contacts[this.activeIndex].messages[index].text
                        } Inviato il ${
                             this.contacts[this.activeIndex].messages[index].date
                        }`
                         );   
                }
                
               
            }
        },
       
    }
            
);