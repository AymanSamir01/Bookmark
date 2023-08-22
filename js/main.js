var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var submit = document.getElementById("submit");
var btnDelete = document.getElementById("btnDelete");
var modal = document.querySelector(".modal");
var btnClose = document.getElementById("btn-close");
var websites = [];
if (JSON.parse(localStorage.getItem("websites")) != null) {
  websites = JSON.parse(localStorage.getItem("websites"));
  displaySites();
}
submit.addEventListener("click", addSite);
function addSite() {
  label: if (validationInputName() && validationInputUrl()) {
    var siteObject = {
      name: siteName.value,
      url: siteUrl.value,
    };
    // check if the site already exist in table
    var find = siteName.value;
    for (let i = 0; i < websites.length; i++) {
      if (websites[i].name == find) {
        alert("Bookmark already existed");
        break label;
      }
    }
    websites.push(siteObject);
    localStorage.setItem("websites", JSON.stringify(websites));
    displaySites();
    clear();
    document.querySelector(".entry .correct-1").style.display = "none";
    document.querySelector(".entry .correct-2").style.display = "none";
  } else {
    modal.style.display = "block";
  }
}
btnClose.addEventListener("click", closeAlert);
function closeAlert() {
  modal.style.display = "none";
}
// display sites in the table
function displaySites() {
  var box = ``;
  for (var i = 0; i < websites.length; i++) {
    box += `
    <tr>
    <td>${i + 1}</td>
    <td>${websites[i].name}</td>
    <td><a href="${websites[i].url}" target="_blank">
      <button class="btn btn-success opacity-75"><i class="fa-solid fa-eye"></i> Visit</button>
      </a></td>
    <td><button onclick="deleteItem(${i})" id="btnDelete" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
    </tr>
    `;
  }
  document.getElementById("contain").innerHTML = box;
}
//remove site from table
function deleteItem(index) {
  websites.splice(index, 1);
  localStorage.setItem("websites", JSON.stringify(websites));
  displaySites();
}
//clear form after submit
function clear() {
  siteName.value = "";
  siteUrl.value = "";
}
siteName.addEventListener("keyup", changeNameStyles);
function changeNameStyles() {
  if (validationInputName()) {
    siteName.classList.replace("is-invalid", "is-valid");
  } else {
    siteName.classList.add("is-invalid");
  }
}
siteUrl.addEventListener("keyup", changeUrlStyles);
function changeUrlStyles() {
  if (validationInputUrl()) {
    siteUrl.classList.replace("is-invalid", "is-valid");
  } else {
    siteUrl.classList.add("is-invalid");
  }
}
// validation siteName
function validationInputName() {
  var regex = /^[a-z]{3,}$/;
  return regex.test(siteName.value);
}
// validation siteUrl
function validationInputUrl() {
  var regex = /^(https:\/\/|http:\/\/)[a-z]{1,}\.[a-z]{2,}$/;
  return regex.test(siteUrl.value);
}
