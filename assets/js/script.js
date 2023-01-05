// Defining variables
let table = document.querySelector('#table'),
    tableItem = document.querySelector('tableItem'),
    form = document.querySelector('form'),
    first_name = document.querySelector('#firstName'),
    last_name = document.querySelector('#lastName'),
    email = document.querySelector('#email'),
    gender = document.querySelector('#gender'),
    age = document.querySelector('#age'),
    bio = document.querySelector('#bio'),
    error = document.querySelector('#error'),
    fname_error = document.querySelector('#fname_error'),
    lname_error = document.querySelector('#lname_error'),
    age_error = document.querySelector('#age_error'),
    mail_error = document.querySelector('#mail_error'),
    bio_error = document.querySelector('#bio_error'),
    allDlt = document.querySelector('#allDlt'),
    users;
    edit = false;
    editIndex = -1;

// Submit Form Trigger

const oldUsers = localStorage.getItem('users');
if (oldUsers) {
  users = JSON.parse(oldUsers)
}
else {
  users = [];
  localStorage.setItem("users", JSON.stringify(users))
};
console.log(users);

// all delete button show and hide
let AllDeleteDisplay = () => {
  if (table.childElementCount > 0) {
    allDlt.classList.add("active");
    table_content.classList.add("active");
  } else {
    allDlt.classList.remove("active");
    table_content.classList.remove("active");
    table.innerHTML = 'please add value for results';
  }
};
// randerFunction : For rendering updated table 
let randerFunction = () => {

  table.innerHTML = "";

  for (i = 0; i < users.length; i++) {
    let newItem = document.createElement('tr');
    //  let newTD = document.createElement('td');
    const template = `<td> ${i + 1} </td> <td> ${users[i].userName.first_name} ${users[i].userName.last_name} </td>
 <td> ${users[i].email} </td> <td> ${users[i].gender} </td> <td> ${users[i].age} </td> <td> ${users[i].bio} </td>
 <td> <button onclick="deleteRow('${users[i].id}')" data-index-value=${i}>delete</button> </td>  <td> <button onclick="editRow('${users[i].id}')" data-index-value=${i}>Edit</button> </td>`;
    newItem.innerHTML = template;
    table.appendChild(newItem);
  }
  // first_name.value = ""; last_name.value = ""; email.value = ""; gender.value = ""; age.value = ""; bio.value = "";
  AllDeleteDisplay();
  // console.log(table.childElementCount);
};

randerFunction();

function submitUser() {
  if(edit == false){
    let user = {
      userName: {
        first_name: first_name.value,
        last_name: last_name.value
      },
      email: email.value,
      gender: gender.value,
      age: age.value,
      bio: bio.value,
      id: new Date()
    };
    // console.log(user);
    users.push(user);
    
    first_name.value = ""; last_name.value = ""; email.value = ""; gender.value = ""; age.value = ""; bio.value = "";
    randerFunction();
  } else{

    // upade edited object

    users[editIndex].userName.first_name = first_name.value;
    users[editIndex].userName.last_name = last_name.value;
    users[editIndex].age =  age.value;
    users[editIndex].email = email.value;
    users[editIndex].gender = gender.value;
    users[editIndex].bio = bio.value;

    // reset edit values
    edit = false;
    editIndex = -1;

  }
  localStorage.setItem("users", JSON.stringify(users))
  }
  function submitForm() {
    // e.preventDefault();
  if (first_name.value === "" || last_name.value === "" || email.value === "" || gender.value === "" || age.value === "" || bio.value === "") {
    error.innerHTML = "all flield are require";
    return false;
  } else if (first_name.value[0] != first_name.value[0].toUpperCase()) {
    fname_error.innerHTML = "First letter should be capital";
    return false;
  } else if (last_name.value[0] != last_name.value[0].toUpperCase()) {
    lname_error.innerHTML = "First letter should be capital";
    return false;
  } else if (isNaN(age.value)) {
    age_error.innerHTML = "Age should be an numbers only";
    return false;
  } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value) == false) {
    mail_error.innerHTML = "Enter a mail";
    return false;
  }  else if (bio.value.trim().length > 100) {
    bio_error.innerHTML = "Bio is only 100 charchrtor alow";
    return false;
  }
  else {
    error.innerHTML = "";
    fname_error.innerHTML = "";
    lname_error.innerHTML = "";
    mail_error.innerHTML = "";
    submitUser();
    return true;
  }

};

// Remove List Element
function deleteRow(id) {
  let newUsers = users.filter((obj) => obj.id != id);
  // console.log(newUsers);
  users = newUsers;
  localStorage.setItem("users", JSON.stringify(users));
  randerFunction();
  AllDeleteDisplay();
}

// Edit List Element
function editRow(id) {
  let objIndex = users.findIndex((obj => obj.id == id));
  //Log object to Console.
  console.log("Before update: ", users[objIndex])
  // console.log("Before update: ", users[objIndex])
  console.log(users[objIndex].email);
  first_name.value = users[objIndex].userName.first_name;
  last_name.value = users[objIndex].userName.last_name;
  age.value = users[objIndex].age;
  email.value = users[objIndex].email;
  gender.value = users[objIndex].gender;
  bio.value = users[objIndex].bio;
  // id = users[objIndex].id;
  // deleteRow(id);

  edit = true;
  editIndex = objIndex;
}


// remove All List Items
allDlt.addEventListener('click', function () {
  table.innerHTML = '';
  users = [];
  allDlt.classList.remove("active");
  localStorage.setItem("users", JSON.stringify(users));
  randerFunction();
});