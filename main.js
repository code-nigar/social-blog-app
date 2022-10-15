// function openPostForm(){
//     document.getElementById("initial-view").className="mk-invisible";
//     showdiv =  document.getElementById("secondary-view");
//    if (showdiv.style.visibility === "hidden") {
//     showdiv.style.visibility = "visible";
//     showdiv.style.position = "absolute";
//     showdiv.style.top = "20px";
//   } else {
//     showdiv.style.visibility = "hidden";
//   }
// }
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-app.js";
import { getAuth, signOut,  onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAj7LvL92dgZqS40oG2RlO05hsg81cz7sQ",
  authDomain: "post-app-23f46.firebaseapp.com",
  projectId: "post-app-23f46",
  storageBucket: "post-app-23f46.appspot.com",
  messagingSenderId: "351026662190",
  appId: "1:351026662190:web:c633f76e512eb2a456c8bf"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    
    console.log(user);
    // const db = getDatabase();
    //   onValue(ref(db, `users/${user.uid}`), (data)=>{
    //     console.log("data =>",data.val());
    //     un.innerHTML = data.val().username;
    //   })
    // ...
  } else {
    // User is signed out
    console.log("user not signed in");
    // ...
  }
});

//logout
var LogoutBtn = document.getElementById("logout-btn");

LogoutBtn.addEventListener('click', function(){
    const auth = getAuth();
  signOut(auth).then(() => {
    console.log("Sign-out successful");// Sign-out successful.
  }).catch((error) => {
    console.log(error);// An error happened.
  });
    localStorage.setItem("current-user-id", "");
    goBack();
})

function goBack(){
    let currentPath = window.location.pathname;
    let newpath = currentPath.slice(0,currentPath.indexOf("main")) + "index.html"
    window.location.pathname = newpath;
  }


var quill = new Quill('#editor', {
    theme: 'snow'
});
  
var bgColor;

function assign_Bg_1(){
  bgColor = "linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)"
  document.getElementById("block2").style.visibility="hidden";
  document.getElementById("block3").style.visibility="hidden";
  document.getElementById("block4").style.visibility="hidden";
}
function assign_Bg_2(){
  bgColor = "linear-gradient(45deg, #08AEEA 0%, #2AF598 100%)"
  document.getElementById("block1").style.visibility="hidden";
  document.getElementById("block3").style.visibility="hidden";
  document.getElementById("block4").style.visibility="hidden";
}
function assign_Bg_3(){
  bgColor = "linear-gradient(45deg, #FBDA61 0%, #FF5ACD 100%)"
  document.getElementById("block1").style.visibility="hidden";
  document.getElementById("block2").style.visibility="hidden";
  document.getElementById("block4").style.visibility="hidden";
}
function assign_Bg_4(){
  bgColor = "linear-gradient(45deg, #00DBDE 0%, #FC00FF 100%)"
  document.getElementById("block2").style.visibility="hidden";
  document.getElementById("block3").style.visibility="hidden";
  document.getElementById("block1").style.visibility="hidden";
}

function postFunc(){
    event.preventDefault()
  // var para = document.getElementById("editor").value;
  // document.getElementById("textfield").value = "";
  var text = quill.root.innerHTML;
  var name = document.getElementById("inputname").value;
  if(text === "" || name === "" ){
    alert("fill up the required fields");
  }else{
    console.log(text);
    console.log(name);
  document.getElementById("inputname").value ="";
  document.getElementById("block1").style.visibility="visible";
  document.getElementById("block2").style.visibility="visible";
  document.getElementById("block3").style.visibility="visible";
  document.getElementById("block4").style.visibility="visible";

  const newpost = document.createElement("div");
  const newpost_header = document.createElement("div");
  const newpost_body = document.createElement("div");
  const newpost_profile = document.createElement("div");
  const newpost_author = document.createElement("div");
  const newpost_para = document.createElement("div");

  newpost.className = "the-post";
  newpost_author.className = "the-post-author";
  newpost_profile.className = "the-post-author-profile";
  newpost_header.className = "the-post-header";
  newpost_para.className = "the-post-para";
  newpost_body.className = "the-post-body";

  newpost_para.innerHTML = text;
  newpost_author.innerHTML = name;
  newpost_profile.innerHTML = name[0];

  newpost.style.backgroundImage = bgColor;
  newpost_header.appendChild(newpost_profile);
  newpost_header.appendChild(newpost_author);
  newpost_body.appendChild(newpost_para);
  newpost.appendChild(newpost_header);
  newpost.appendChild(newpost_body);
  document.getElementById("post-container").appendChild(newpost);

quill.root.innerHTML = "";
  }
}