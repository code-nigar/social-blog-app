import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-auth.js";
import { getFirestore, collection, doc ,setDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-firestore.js";

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

//Authentication
const auth = getAuth();

var registrationBtn = document.getElementById("register-btn");

registrationBtn.addEventListener('click', function(){
  let userName = document.getElementById("name").value;
  let userEmail = document.getElementById("email").value;
  let pass = document.getElementById("password").value;
  //signup with firebase
  createUserWithEmailAndPassword(auth, userEmail, pass)
  .then((userCredential) => {
    // Signup process passed
    const user = userCredential.user;
    console.log("User => ",user);
      //set userdata to firestore db
      try {
          setDoc(doc(db, "users", `${user.uid}`), {
          name: userName,
          email: userEmail,
          password: pass
          });
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
        //switch signup to login window
        var switchWindow = document.getElementById("input");
        switchWindow.checked = true;
      } catch (e) {
      console.error("Error adding document: ", e);
      }
  }).catch((error) => {
    //catch error for signup failure
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
    });
  });
});

//Login
var LoginBtn = document.getElementById("login-btn");

LoginBtn.addEventListener('click', function(){
  let loginMail = document.getElementById("l-email").value;
  let loginPass = document.getElementById("l-password").value;
  //Sign in with firebase
  signInWithEmailAndPassword(auth, loginMail, loginPass)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log("User => ",user);
      localStorage.setItem("current-user-id", user.uid);
      //switch to new page
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