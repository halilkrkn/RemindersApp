import firebase from "firebase";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBA37Sc7HGpS9Hs4QblMRVw8R4gvWaTwtA",
  authDomain: "reminderapp-1e39d.firebaseapp.com",
  projectId: "reminderapp-1e39d",
  storageBucket: "reminderapp-1e39d.appspot.com",
  messagingSenderId: "487181771628",
  appId: "1:487181771628:web:1caf37d366f9bc3acfc949",
};

class Firebase {
  constructor(callback) {
    this.init(callback);
  }

  init(callback) {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        callback(null, user);
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .catch((error) => {
            callback(error);
          });
      }
    });
  }

  getLists(callback) {
    let ref = this.ref.orderBy("name");

    this.unsubscribe = ref.onSnapshot((snapshot) => {
      reminderLists = [];

      snapshot.forEach((doc) => {
        reminderLists.push({ id: doc.id, ...doc.data() });
      });
      callback(reminderLists);
    });
  }

  addList(list) {
    let ref = this.ref;

    ref.add(list);
  }

  updateList(list) {

    let ref = this.ref

    ref.doc(list.id).update(list)

  }

  get userId() {
    return firebase.auth().currentUser.uid;
  }

  get ref() {
    return firebase
      .firestore()
      .collection("users")
      .doc(this.userId)
      .collection("reminderLists");
  }

  detach() {
    this.unsubscribe();
  }
}

export default Firebase;
