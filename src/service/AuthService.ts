import firebase from 'firebase';
import React from 'react';
import { UserInfo } from '../domain/backendAuthDos';
import BackendAuthExtService from '../extService/BackendAuthExtService';

type OnAuthStateChange = ((isLoading: boolean) => void);
type OnSignInError = (code: string, message: string) => void;

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

    static signedInUserInfo?: UserInfo;

    onAuthStateChange: OnAuthStateChange;

    constructor(onAuthStateChange: OnAuthStateChange){
        if(!firebase.apps.length){
            firebase.initializeApp(this.firebaseConfig);

        }else{
            firebase.app();
        }
        this.onAuthStateChange = onAuthStateChange;
    }

    static getIdToken(){
        //if true -> firebase will return a new idToken
        //if false -> firebase will return the previous idToken if not yet expired
        return firebase.auth().currentUser!.getIdToken(false);
    }


    init(){
        firebase.auth().onAuthStateChanged((user)=> {
            console.log("onAuthStateChanged: ", user)
            if(user){
                //signed In
                //Get the latest idToken from Firebase directly
                firebase.auth().currentUser!.getIdToken(false)
                    .then((idToken)=>{
                        BackendAuthExtService.getMyUserInfo(idToken, (userInfo)=>{
                            AuthService.signedInUserInfo = userInfo;
                            console.log("Login Success!", AuthService.signedInUserInfo.uid)
                            // login process finished
                            this.onAuthStateChange(false);
                            //call API for asking user details
                        })
                    })
            }else{
                //signed out
                AuthService.signedInUserInfo = undefined;
                this.onAuthStateChange(false);
            }
        })
    }

    static isSignedIn(){
        return AuthService.signedInUserInfo !== undefined && AuthService.signedInUserInfo !== null;
    }

    signInWithEmailPassword(email: string, password: string, onError: OnSignInError){
        //triggered the login action
        this.onAuthStateChange(true);         //trigger loading


        firebase.auth().signOut()
            .then(() =>{
                firebase.auth().signInWithEmailAndPassword(email, password)
                .catch((error) => {
                    console.log("login Failed!!")
                    onError(error.code, error.message);
                    // login process finished
                    this.onAuthStateChange(false);
                });
            });
    }

    signInWithGoogle(onError: OnSignInError){
        this.onAuthStateChange(true);         //trigger loading
        // this.signedInEmail = undefined;
        firebase.auth().signOut()
        .then(() =>{
            const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(googleAuthProvider)
            .catch((error) => {
                console.log("login Failed!!");
                onError(error.code, error.message);
                // login process finished
                this.onAuthStateChange(false);
            })
        })
    }

    signInWithFacebook(onError: OnSignInError){
        this.onAuthStateChange(true);         //trigger loading
        // this.signedInEmail = undefined;
        firebase.auth().signOut()
        .then(() =>{
            const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
            firebase.auth().signInWithPopup(facebookAuthProvider)
                .catch((error) => {
                    console.log("login Failed!!");
                    onError(error.code, error.message);
                    // login process finished
                    this.onAuthStateChange(false);
                })
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