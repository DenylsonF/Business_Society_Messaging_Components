import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'


class Fire{
    constructor(){
        if(!firebase.apps.length){
            firebase.initializeApp({
                apiKey: "AIzaSyD13agNWTPEX2z7MgNWn1uw46dCwu5r0aU",
                authDomain: "chat-4-9a2fe.firebaseapp.com",
                projectId: "chat-4-9a2fe",
                storageBucket: "chat-4-9a2fe.appspot.com",
                messagingSenderId: "988586786953",
                appId: "1:988586786953:web:5efcd418f9224a04ce8658",
                measurementId: "G-FSX95KTCSD",
                databaseURL: "https://chat-4-9a2fe-default-rtdb.firebaseio.com/"
            })
        }

    }

    login = async( user, success_callback, failed_callback) =>{
        await firebase
            .auth()
            .signInWithEmailAndPassword(user.email, user.password)
            .then(success_callback, failed_callback)
            .then(
                function (){
                    var userf = firebase.auth().currentUser;
                    userf.updateProfile({ displayName: user.name});
                }
            )
        
    }
    
    createAccount = async user =>{
        console.log('Sign up')
        console.log(user)

        await firebase
            .auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then(
                function (){
                    var userf = firebase.auth().currentUser;
                    if (user.image){
                        userf.updateProfile({ displayName: user.name, photoURL: user.image});
                    }
                    else{
                        userf.updateProfile({ displayName: user.name});
                    }
                }
            )
            

    }

    logout = async () =>{
        await firebase
            .auth()
            .signOut()
            .then(console.log('Signed Out'))
    }

    addRoom = async(roomName) =>{
        try{
            await firebase
            .firestore()
            .collection("Threads")
            .doc(roomName)
            .set({
                name: roomName,
                messages:{
                }
            })
            .then(
                console.log("Added")
            )
        }catch(error){
            console.log(error)
        }

    }

    getRooms = async() =>{
        try{
             await firebase
                .firestore()
                .collection("Threads")
                .onSnapshot((querySnapshot) =>{
                    const threads = querySnapshot.docs.map((documentSnapShot) =>{
                        return{
                            _id: documentSnapShot.id,
                            name: '',
                            ...documentSnapShot.data(),
                        };
                    })
                })
            
        }catch(error){
            console.log(error)
        }
        
    };

    get uid(){
        return(firebase.auth().currentUser || {}).uid;
    }

    get ref(){
        return firebase.database().ref('messages');
    }
    
    //this is how we will be calling the message table in order to stay up to date
    //we will only show however, the last 20 messages
    //Once we do we will call a parse function to have a clean 
    //message object
    on = callback =>{
        this.ref
            .limitToLast(20)
            .on('child_added', snapshot => callback(this.parse(snapshot)));
    }

    //This is how we will parse the data/messages 
    parse = snapshot =>{
        const { timestamp: numberStamp, text, user } = snapshot.val();
        const { key: _id } = snapshot;
        const timestamp = new Date(numberStamp);
        const message = {
            _id,
            timestamp,
            text,
            user,
        };
        return message;

    }


    //This will return a timestamp of when the messages sent
    get timestamp(){
        return firebase.database.ServerValue.TIMESTAMP;
    }

    //This is how we will send messages and also structure them neatly
    send = (messages) =>{
        for(let i = 0; i < messages.length; i++){
            const { text, user} = messages[i];
            const message = {
                text,
                user,
                timestamp: this.timestamp,
            }
            this.append(message);
        }
    }

    append = message => this.ref.push(message);

    //Now we want to make an off reference to the firebase
    off(){
        this.ref.off();
    };


}

Fire.shared  = new Fire();
export default Fire;