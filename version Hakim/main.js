/*
  
    partie variables 

*/
let form;

/*
  
    partie fonctions 

*/
function displaySection( contactList = 'none', contactAdd = 'none'){
    document.querySelector('#contact-list').style.display = contactList;
    document.querySelector('#contact-add').style.display = contactAdd;
}

function displayContactList(){

}

function createContact(){

}

function addContact(){


}

function getContacts(){

}

function deleteContact(){

}

// function qui se lance quand je clique sur mon formulaire 
function submitAddForm(event){

    // supprime tout les elements par défault d'une page ( par exemple le fait de cliquer sur un lien 
    // et charger une page ou encore le fait qu'un formulaire s'envoi )
    event.preventDefault();

    // je mets mon formulaire selectionné plutot + name ou id 
    // préferable de garder le name dans le input 
    // console.log(form.lastName);
    // console.log(form.lastName.value);
    checkString(form.lastName);

    //console.log(form.firstName.value);
    checkString(form.firstName);

    //console.log(form.telephoneNumber.value);
    checkTel(form.telephoneNumber);

    const formResult = (checkString(form.lastName) ==  true ) 
                    && (checkString(form.firstName) == true ) 
                    && (checkTel(form.telephoneNumber) == true);

    console.log(formResult);
    // implique que tout mes tests sont concluant ( nom, prenom, tel sont bons)
    if(formResult == true){
        // console.log('all is good ');
        return    addFlashMessage('success', ' le contact a bien été créé');
    }
    return addFlashMessage('danger',' erreur a la création du contact')

}


function submitAddForm2(event){

    event.preventDefault();

    return (checkString(form.lastName) && checkString(form.firstName) && checkTel(form.telephoneNumber)) ? addFlashMessage('success', ' le contact a bien été créé')
    : addFlashMessage('danger',' erreur a la création du contact')

}

// verifie une chaine de caractere 
function checkString(element){

    if(element.value.trim()){
        element.className = "form-control is-valid";
        return true;
    }
    
    element.className = "form-control is-invalid";
    return false;
}

// verifie un numéro de telephone 
function checkTel(element){

    const regex = /^(?:0|\+33 ?|0?0?33 ?|)([1-9] ?(?:[0-9] ?){8})$/i;
    if(regex.test(element.value)){
        element.className = "form-control is-valid";
        return true;
    }
    
    element.className = "form-control is-invalid";
    return false;
}

// gestion de mes messages d'erreur 
function addFlashMessage(type, content){
    // je crée le contenu de mon message d'alerte 
    const text = `<div class="alert alert-${type}" role="alert">
                        ${content}
                    </div>`;
    
    // je verifie qu'une alerte n'existe pas deja, si c'est le cas je le supprime 
    if(document.querySelector('.alert') != null){
        document.querySelector('.alert').remove();
    }

    return document.querySelector('#contact-add-title').insertAdjacentHTML('beforebegin', text);

}

/*
  
    partie programme 

*/
document.addEventListener('DOMContentLoaded', ()=>{
    
    displaySection()
    // document.forms selectionne tous les formulaires du fichier Html 
    form = document.forms['form-add'];
    //console.log(document.forms['form-add']);
    //console.log(document.forms[0]);
     
    form.addEventListener('submit', submitAddForm);
    
});

document.addEventListener('click', event =>{

    if(event.target.matches('#display-contact-list'))
    {
        displaySection('block','none');
    }

    if(event.target.matches('#display-form-add'))
    {
        displaySection('none','block');
    }

    if(event.target.matches('#empty-result-div'))
    {
        displaySection();
    }
        
});