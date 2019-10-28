
window.onload = function() {
  document.getElementById("add-form").style.display = 'none'; //hides the form
  var storedUsers = Array.from(retrieveUsers());

  for (var i = 0; i < storedUsers.length; i++) {
    let user = storedUsers[i];
    populate(user.userName, user.userDesc, user.userURL);
  }
}


function populate(artistName, aboutArtist, artistURL){
    var allArtists = document.querySelector('#all-artists');   //this is a way to access my div in my html
    var containerDiv = document.createElement('div');
    var image = document.createElement('img');
    var infoDiv = document.createElement('div');
    var p1 = document.createElement('p');
    var header = document.createElement('h2');
    var name = document.createTextNode(artistName);
    var description = document.createTextNode(aboutArtist);
    var p2 = document.createElement('p');

    infoDiv.classList.add('info');  // way of adding a class to my infoDiv
    containerDiv.classList.add('container');

    allArtists.appendChild(containerDiv);  //appending my new div to my div in my html
    image.setAttribute('src', artistURL);
    containerDiv.appendChild(image);
    containerDiv.appendChild(infoDiv);
    infoDiv.appendChild(p1);
    p1.appendChild(header);
    header.appendChild(name);
    infoDiv.appendChild(p2);
    p2.appendChild(description); 

    var button = document.createElement('BUTTON');   //creating (delete) button element
    button.classList.add('delete-button');
    var text = document.createTextNode("Delete");    //creating text node to be displayed on button
    button.appendChild(text);                        //appending text to button
    containerDiv.appendChild(button);                //appending button to div
    button.onclick = removeArtist;                   //removes artist
}


function myFunction(){
    var x = document.getElementById("add-form");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
}


function myInput(){
    var artistName = document.getElementById("username");
    var artistAbout = document.getElementById("about");
    var artistURL = document.getElementById("url");

    if (artistName.value == "" || artistAbout.value == "" || artistURL.value == ""){
        alert("All fields must be filled.");
    } else {
      var input = document.querySelector("#add-form");  //this accesses my #add-form in my html
      populate(input.elements[0].value, input.elements[1].value, input.elements[2].value);

      storeUser(); //local storage function for storing

      input.reset();  //clears form 
      document.getElementById("add-form").style.display = 'none'; //hides form after submitting
    }
}


function removeArtist(){
    var art = this.parentNode;

    const deadArt = {
      userName: art.getElementsByTagName('h2')[0].innerHTML,
      userDesc: art.getElementsByTagName('p')[1].innerHTML
    }

    var currentList = Array.from(retrieveUsers());
    currentList = currentList.filter(currentList => currentList.userName !== deadArt.userName 
                                    && currentList.userDesc !== deadArt.userDesc);
    
    art.parentNode.removeChild(art);
    localStorage.setItem('user', JSON.stringify(currentList));
}


function storeUser(){
  var input = document.querySelector("#add-form");

  const user = {                                    //creates a new user with input of fields
    userName : input.elements[0].value,
    userDesc : input.elements[1].value,
    userURL : input.elements[2].value
  }          
  
  let userList = retrieveUsers();
  userList.push(user);
  localStorage.setItem('user', JSON.stringify(userList));   //setting the new array object in local storage
}


/* Retrieves data from local storage JSON */
function retrieveUsers(){
  let userList = JSON.parse(localStorage.getItem('user'));
  if (!userList) {
    userList = [];
  }
  return userList; 
}


function searchUsers(){
  var currentList = Array.from(retrieveUsers());
  var input = document.getElementById("searchInput");
  var filterList = [];

  for(i = 0; i < currentList.length; i++){
    if(((currentList[i].userName).toLowerCase()).includes((input.value).toLowerCase())){
      filterList.push(currentList[i]);
    } else {}
  }

  var allArtists = document.querySelector('#all-artists'); 

  while(allArtists.firstChild){
    allArtists.removeChild(allArtists.firstChild)
  }
  
  for(i = 0; i < filterList.length; i ++){
    populate(filterList[i].userName, filterList[i].userDesc, filterList[i].userURL);
  }
}

