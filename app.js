//Contact Class
class Contact {
    constructor(civ, name, firstName, phone){
        this.civ = civ;
        this.name = name;
        this.firstName = firstName;
        this.phone = phone;
    }
}
//***********variables
// let contacts = [new Contact("Mr", "Phan", "Adrien", "0667442056"), new Contact("Mme", "Augustini", "Marie", "0123456789")];
let contacts = GetContactsFromStorage();
let isDisplayed = false;
//***********elements
const contactDisplayTable = document.getElementById('contact-display');
const displayButton = document.getElementById("displayContactsBtn");
const addContactButton = document.getElementById("addContactButton");
const blankPage = document.getElementById("blankPage");
const newContactForm = document.getElementById("newContactForm");
const alertToastElement = document.getElementById("alertToast");
const toastMessage = document.getElementById("toastMessage");
const alertToast = new bootstrap.Toast(alertToastElement);
const newContactModal = new bootstrap.Modal(document.getElementById("exampleModal"));
const formInputName = document.getElementById("formInputName");
const formInputFirstName = document.getElementById("formInputFirstName");
const formInputPhone = document.getElementById("formInputPhone");
//***********Events
displayButton.addEventListener("click", DisplayContacts);
addContactButton.addEventListener("click", CreateNewContact);
blankPage.addEventListener("click", DisplayBlankPage);
//***********Form color
formInputName.addEventListener("blur", (e)=>{
    if (CheckName(e.target.value)){
        e.target.style.border = "2px solid green";
    } else {
        e.target.style.border = "2px solid red";
    }
});
formInputFirstName.addEventListener("blur", (e)=>{
    if (CheckName(e.target.value)){
        e.target.style.border = "2px solid green";
    } else {
        e.target.style.border = "2px solid red";
    }
});
formInputPhone.addEventListener("blur", (e)=>{
    if (CheckPhoneNumber(e.target.value)){
        e.target.style.border = "2px solid green";
    } else {
        e.target.style.border = "2px solid red";
    }
});
//***********Functions

/**
 * Adds Contacts to table html
 */
function DisplayContacts(){
    let contactIndex;
    let deleteIndex;
    let suppress;
    //If contacts are not displayed, displays them
    if(!isDisplayed){
        contactIndex = 0;
        contactDisplayTable.innerHTML = "<tr><th scope='coll'>Civility</th><th scope='col'>First name</th><th scope='col'>Last</th><th scope='col'>Phone</th><th>Delete</th></tr></thead>";
        //for each contact in the list, creates a row and fills it
        for (const contact of contacts) {
            //Create new element
            let deleteIndex;
            let tbody = document.createElement("tbody");
            let tr = document.createElement("tr");
            let civ = document.createElement("td");
            let name = document.createElement("td");
            let firstname = document.createElement("td");
            let phone = document.createElement("td");
            let deleteButton = document.createElement('button');
            //Place new element
            contactDisplayTable.appendChild(tbody);
            tbody.appendChild(tr);
            tr.appendChild(civ);
            civ.innerHTML = contact.civ;
            tr.appendChild(name);
            name.innerHTML = contact.name;
            tr.appendChild(firstname);
            firstname.innerHTML = contact.firstName;
            tr.appendChild(phone);
            phone.innerHTML = contact.phone;
            //delete button
            tr.appendChild(deleteButton);
            deleteButton.setAttribute("class", "btn btn-danger");
            deleteButton.setAttribute("id", "delete-" + contactIndex);
            deleteButton.style.backgroundColor = "#b02a37";
            deleteButton.innerHTML = "Supprimer";
            //Make delete button somewhat useful
            deleteButton.addEventListener("click", DeleteContact);
            deleteButton.associatedContact = deleteButton;
            contactIndex++;//increment index
        }
    }
    isDisplayed = true;
}
function DeleteContact(e){
    //delete index in contacts list
    deleteIndex = e.currentTarget.associatedContact.id.substr(7);
    suppress = contacts.splice(deleteIndex, 1);
    //delete contact in DOM
    RefreshContacts();
}
//deletes the list from the DOM
function DisplayBlankPage(){
    if (isDisplayed){
        contactDisplayTable.innerHTML = "";
        isDisplayed = false;
    }
}
//Displays the new contact form
function DisplayAddForm(){
    DisplayBlankPage();

}
//Creates a new Contact in contacts
function CreateNewContact(){
    let civ = document.getElementById("formInputCiv").value;
    let name = document.getElementById("formInputName").value;
    let firstName = document.getElementById("formInputFirstName").value;
    let phoneNbr = document.getElementById("formInputPhone").value;
    //check phone number before pushing to contacts[]
    if(CheckPhoneNumber(phoneNbr) && CheckName(name) && CheckName(firstName)){
        contacts.push(new Contact(civ, name, firstName, phoneNbr));
        if(isDisplayed) RefreshContacts();
        SetContactsToStorage();
        newContactModal.hide();
        console.log(newContactModal);
        ToastAlert("Nouveau contact enregistré !", "green")
    } else if(!CheckPhoneNumber(phoneNbr)) {
        ToastAlert("Numéro de téléphone Invalide", "red");
    } else if(!CheckName(name)){
        ToastAlert("Nom Invalide", "red");
    }else if(!CheckName(firstName)){
        ToastAlert("Prénom Invalide", "red");
    }
}
//Refreshes contacts page
function RefreshContacts(){
    DisplayBlankPage();
    SetContactsToStorage();
    DisplayContacts();
}
//returns true if phone number is actually a french phone number
function CheckPhoneNumber(phoneNbr){
    const phoneValidator = /^0[0-9]{9}$|^(0033)[0-9]{9}$/gm;
    if(phoneValidator.test(phoneNbr)){
        return true;
    } else return false;
}
function CheckName(name){
    const nameValidator = /^[a-z ,.'-]+$/i;
    if (nameValidator.test(name)){
        return true;
    } else return false;
}
//Displays a toast alert with given message and background color
function ToastAlert(message, color){
    alertToastElement.style.backgroundColor = color;
    toastMessage.style.color = "#fff";
    toastMessage.innerHTML = message;
    alertToast.show();
}
//Returns the content of item "contacts" in local storage
function GetContactsFromStorage(){
    if (localStorage.getItem("contacts")===null || localStorage.getItem("contacts") === ""){
        localStorage.setItem("contacts", "[]");
    }
    return JSON.parse(localStorage.getItem("contacts"));
}
function SetContactsToStorage(){
    localStorage.setItem("contacts", JSON.stringify(contacts));
}