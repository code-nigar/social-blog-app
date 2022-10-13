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