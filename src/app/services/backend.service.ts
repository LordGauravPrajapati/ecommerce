import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private itemDoc: AngularFirestoreDocument<any>;
  item: Observable<any>;

  constructor(public afAuth : AngularFireAuth,private afs : AngularFirestore ) { }

  getConfig(){
  return environment.social;
  }
  login(loginType,formData?) {
    // this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    if(formData){
      return this.afAuth.auth.signInWithEmailAndPassword(formData.email,formData.password);
    }else {
      let loginMethod;
      if(loginType=='FB'){loginMethod = new firebase.auth.FacebookAuthProvider();}
      if(loginType=='GOOGLE'){loginMethod = new firebase.auth.GoogleAuthProvider();}
      return this.afAuth.auth.signInWithRedirect(loginMethod)
    }
  }
  //method to retreive firbase auth after login redirect
  redirectLogin(){
    return this.afAuth.auth.getRedirectResult();
  }
  logout() {
    return this.afAuth.auth.signOut();
  }
getDoc(callUrl:string){
  this.itemDoc = this.afs.doc<any>(callUrl);
  return this.itemDoc.valueChanges();
}

 timestamp(filter){
  var d =new Date();
  return d;
}

getCollectionURL(filter){
  return "onlinestore/casual/"+filter;
}

setDocs(call:string,data:any,docId?:any){
  const id = this.afs.createId();
  const item = {id,name};
  const timestamp = this.timestamp
  var docRef = this.afs.collection(this.getCollectionURL(call)).doc(item.id);
  return docRef.set({
    ...data,
    _id: id,
    updateAt: timestamp,
    createdAt: timestamp,
    delete_flag:"N",
    authid:this.afAuth.auth.currentUser.uid,
    username:this.afAuth.auth.currentUser.displayName,
    useremail:this.afAuth.auth.currentUser.email
  });
}

isUserLoggedin():Observable<boolean> {
return Observable.from(this.afAuth.authState)
.take(1)
.map(state => !!state)
.do(authenticated => {
  return authenticated;
});
}
isUserAdmin(){
  let callUrl = !this.isUserLoggedin() ? "abcd" : this.afAuth.auth.currentUser.uid;
  callUrl = "onlinestore/casual/admins/" + callUrl;
  return this.getDoc(callUrl);
}
  //fake functions below
  getDocs(call:string,filters?:any){
   // this.itemsCollection = this.afs.collection<any>(this.getCollectionURL(call));
     //return this.itemsCollection.valueChanges();
  }
  getOneDoc(callType,docId){
    let docUrl = this.getCollectionURL(callType)+"/"+docId;
    this.itemDoc = this.afs.doc<any>(docUrl);
    return this.itemDoc.valueChanges();
  }

  updateDocs(call:string,data:any,docId?:any){
    const id = this.afs.createId();
    const item = {id,name};
    const timestamp = this.timestamp
    var docRef = this.afs.collection(this.getCollectionURL(call)).doc(data.id);
    return docRef.update({
      ...data,
      _id: id,
      updateAt: timestamp,
      authid:this.afAuth.auth.currentUser.uid,
      username:this.afAuth.auth.currentUser.displayName,
      useremail:this.afAuth.auth.currentUser.email
    });
  }
   delOnedoc(call,docId){
    const id = this.afs.createId();
    const item = {id,name};
    const timestamp = this.timestamp
    var docRef = this.afs.collection(this.getCollectionURL(call)).doc(docId);
    return docRef.update({
      delete_flag:"Y",
      _id: id,
      updateAt: timestamp,
      authid:this.afAuth.auth.currentUser.uid,
      username:this.afAuth.auth.currentUser.displayName,
      useremail:this.afAuth.auth.currentUser.email
    });
   }
  getCartTotal(){
    let fakeresponse = "10";
    return Observable.create(
      observer => {
        setTimeout(()=>{
          observer.next(fakeresponse)
        },2000)
      }
    )
  }
  getUserStatus(){
    let fakeresponse = true;
    return Observable.create(
      observer => {
        setTimeout(()=>{
          observer.next(fakeresponse)
        },2000)
      }
    )
  }

  getProducts(callType){
    let fakeresponse = [{
      'category':"test",
      'scategory':"Test",
      'name':"Product Name",
      'price':"300",
      '_id':"123"

    }];
    return Observable.create(
      observer => {
        setTimeout(()=>{
          observer.next(fakeresponse)
        },2000)
      }
    )
  }
  getFilterProducts(callType,filters){
    let fakeresponse = [{
      'category':"test",
      'scategory':"Test",
      'name':"Product Name",
      'price':"300",
      '_id':"123"

    }];
    return Observable.create(
      observer => {
        setTimeout(()=>{
          observer.next(fakeresponse)
        },2000)
      }
    )
  }
  setProducts(callType,filters){
    let fakeresponse = true;
      return Observable.create(
        observer => {
          setTimeout(()=>{
            observer.next(fakeresponse)
          },2000)
        }
      )
}

updateProducts(callType,filters){
  let fakeresponse = true;
    return Observable.create(
      observer => {
        setTimeout(()=>{
          observer.next(fakeresponse)
        },2000)
      }
    )
}

getOneProductDoc(callType,docId){
  let fakeresponse = {
    'category':"test",
    'scategory':"Test",
    'name':"Product Name",
    'price':"300",
    '_id':"123"

  };
  return Observable.create(
    observer => {
      setTimeout(()=>{
        observer.next(fakeresponse)
      },2000)
    }
  )
}
delOneProductDoc(callType,docId){
  let fakeresponse = true;
    return Observable.create(
      observer => {
        setTimeout(()=>{
          observer.next(fakeresponse)
        },2000)
      }
    )
}

updateShoppingInterest(callType,docId){
  let fakeresponse = true;
    return Observable.create(
      observer => {
        setTimeout(()=>{
          observer.next(fakeresponse)
        },2000)
      }
    )
}
updateShoppingCart(callType,docId){
  let fakeresponse = true;
    return Observable.create(
      observer => {
        setTimeout(()=>{
          observer.next(fakeresponse)
        },2000)
      }
    )
}

}
