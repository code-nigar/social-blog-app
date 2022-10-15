import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-firestore.js";

const firebaseConfig = {
apiKey: "AIzaSyAj7LvL92dgZqS40oG2RlO05hsg81cz7sQ",
authDomain: "post-app-23f46.firebaseapp.com",
projectId: "post-app-23f46",
storageBucket: "post-app-23f46.appspot.com",
messagingSenderId: "351026662190",
appId: "1:351026662190:web:c633f76e512eb2a456c8bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//Authentication and registration
const auth = getAuth();

var registrationBtn = document.getElementById("register-btn");

registrationBtn.addEventListener('click', function(){
  let userName = document.getElementById("name").value;
  let userEmail = document.getElementById("email").value;
  let pass = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, userEmail, pass)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("User => ",user);

    try {
      const docRef = addDoc(collection(db, "users"), {
        name: userName,
        email: userEmail,
        password: pass
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    //succeess sweet alert
    Swal.fire({
      title: 'Registration Successful',
      icon: 'success',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    });
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("ERROR => ",errorMessage);
    //error sweet alert
    Swal.fire({
      title: `${errorMessage}`,
      icon: 'error',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
    // ..
  });
});

//Login
var LoginBtn = document.getElementById("login-btn");

LoginBtn.addEventListener('click', function(){
  let loginMail = document.getElementById("l-email").value;
  let loginPass = document.getElementById("l-password").value;


  //const auth = getAuth();
  signInWithEmailAndPassword(auth, loginMail, loginPass)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log("User => ",user);

      // //read data from realtime database
      // const db = getDatabase();
      // onValue(ref(db, `users/${user.uid}`), (data)=>{
      //   console.log("data =>",data.val());
      // })
      localStorage.setItem("current-user-id", user.uid);
      goNewPath();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("ERROR => ",errorMessage);
      }
    );
})



function goNewPath(){
  let currentPath = window.location.pathname;
  let newpath = currentPath.slice(0,currentPath.indexOf("index")) + "main.html"
  window.location.pathname = newpath;
}
