import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-app.js";
import { getAuth, signOut,  onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, setDoc, doc, updateDoc, arrayUnion, arrayRemove} from "https://www.gstatic.com/firebasejs/9.12.0/firebase-firestore.js";

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
const auth = getAuth();

var theUser;
var theBlogs = [];
var bgColor= "linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)";

function theBlogObj(blogger,blogPosted,blogContent){
  blogger = this.blogger;
  blogPosted = this.blogPosted;
  blogContent = this.blogContent;
};

let currentUid = localStorage.getItem("current-user-id")
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    
    console.log(user);
    theUser = user;
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
});

const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
  if(doc.data().blogs){
  console.log(`${doc.id} => ${doc.data().blogs.length}`);
    //console.log("okk")
    let blogz = doc.data().blogs;
    blogz.forEach(element => {
      theBlogs.push(element);
    });
  }
});
console.log(theBlogs);
//retrieve and display pre existing blogs
for(let i=0; i<theBlogs.length; i++){
  document.getElementById("post-container").innerHTML +=
  `
  <div
  class="the-post"
  style="
  background: linear-gradient(90deg, hsla(212, 35%, 58%, 1) 0%, hsla(218, 32%, 80%, 1) 100%);
  "
>
  <div class="the-post-header">
    <div class="the-post-author-profile">${theBlogs[i].bloggername[0]}</div>
    <div class="the-post-author">${theBlogs[i].bloggername}</div>
  </div>
  <div class="the-post-body">
    <div class="the-post-para">
      ${theBlogs[i].bloghtml}
    </div>
  </div>
</div>
  `;
}

function goBack(){
    let currentPath = window.location.pathname;
    let newpath = currentPath.slice(0,currentPath.indexOf("main")) + "index.html"
    window.location.pathname = newpath;
  }


var quill = new Quill('#editor', {
    theme: 'snow'
});

function assign_Bg_1(){
  bgColor = "linear-gradient(90deg, hsla(228, 17%, 53%, 1) 0%, hsla(229, 28%, 88%, 1) 100%)"
  document.getElementById("block2").style.visibility="hidden";
  document.getElementById("block3").style.visibility="hidden";
  document.getElementById("block4").style.visibility="hidden";
}
function assign_Bg_2(){
  bgColor = "linear-gradient(90deg, hsla(176, 61%, 87%, 1) 0%, hsla(150, 54%, 86%, 1) 50%, hsla(301, 68%, 84%, 1) 100%)"
  document.getElementById("block1").style.visibility="hidden";
  document.getElementById("block3").style.visibility="hidden";
  document.getElementById("block4").style.visibility="hidden";
}
function assign_Bg_3(){
  bgColor = "linear-gradient(90deg, hsla(186, 33%, 94%, 1) 0%, hsla(216, 41%, 79%, 1) 100%)"
  document.getElementById("block1").style.visibility="hidden";
  document.getElementById("block2").style.visibility="hidden";
  document.getElementById("block4").style.visibility="hidden";
}
function assign_Bg_4(){
  bgColor = "   background: linear-gradient(90deg, hsla(263, 42%, 65%, 1) 0%, hsla(319, 77%, 86%, 1) 100%)"
  document.getElementById("block2").style.visibility="hidden";
  document.getElementById("block3").style.visibility="hidden";
  document.getElementById("block1").style.visibility="hidden";
}

document.getElementById("block1").addEventListener('click',assign_Bg_1);
document.getElementById("block2").addEventListener('click',assign_Bg_2);
document.getElementById("block3").addEventListener('click',assign_Bg_3);
document.getElementById("block4").addEventListener('click',assign_Bg_4);

function postFunc(){
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

  //add blog to database
  try {
    updateDoc(doc(db,"users", `${currentUid}`),{
      blogs : arrayUnion(
        {
         bloghtml : text,
         blogtime : new Date(),
         bloggername : name
        }
      )
    });
  } catch (error) {
    console.log("error in setting blog to firestore", error);
  }
quill.root.innerHTML = "";
  }
}
document.getElementById("post-btn").addEventListener('click',postFunc);
