import firebase from 'firebase';
import React from 'react';

type OnAuthStateChange = ((isLoading: boolean) => void);

export default class AuthService{
    firebaseConfig = {
        apiKey: "AIzaSyDnf9sXw_DK5HK7O_1WaoXP8FQwO9jVwAM",
        authDomain: "nikki-venturenix-project.firebaseapp.com",
        projectId: "nikki-venturenix-project",
        storageBucket: "nikki-venturenix-project.appspot.com",
        messagingSenderId: "545412809499",
        appId: "1:545412809499:web:aa95385fd1b05aef0f49be",
        measurementId: "G-CN2L8EV21Z"
      };

    signedInEmail?: string | null;

    onAuthStateChange: OnAuthStateChange;

    constructor(onAuthStateChange: OnAuthStateChange){
        this.onAuthStateChange = onAuthStateChange;
    }

    init(){
        firebase.initializeApp(this.firebaseConfig);

        firebase.auth().onAuthStateChanged((user)=> {
            console.log("onAuthStateChanged: ", user)
            if(user){
                //signed In
                this.signedInEmail = user?.email;
                // login process finished
                this.onAuthStateChange(false);
            }else{
                //signed out
                this.signedInEmail = undefined;
                this.onAuthStateChange(false);
            }
        })
    }

    isSignedIn(){
        return this.signedInEmail != undefined && this.signedInEmail != null;
    }

    signInWithEmailPassword(email: string, password: string){
        //triggered the login action
        this.onAuthStateChange(true);         //trigger loading

        this.signedInEmail = undefined;
        //passing the input from user to firebase Server
        firebase.auth().signInWithEmailAndPassword(email, password) // OAuth: firebase return user 
            // .then((userCredential: firebase.auth.UserCredential) => {
            //     let user = userCredential.user
            //     console.log("Login successful~ Email: ", user?.email)
            //     // this.signedInEmail = user?.email;
            //     // // login process finished
            //     // this.onAuthStateChange(false);

            // })
            .catch((error) => {
                console.log("login Failed!!")
                // login process finished
                this.onAuthStateChange(false);
            })
    }

    signInWithGoogle(){
        this.onAuthStateChange(true);         //trigger loading
        this.signedInEmail = undefined;

        const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleAuthProvider)
            .catch((error) => {
                console.log("login Failed!!")
                // login process finished
                this.onAuthStateChange(false);
            })
    }


    signOut(){
        this.onAuthStateChange(true);
        firebase.auth().signOut()
            // .then(() => {
            //     // this.signedInEmail = undefined;
            //     // this.onAuthStateChange(false);
            // });
    }

}