const cl = (elem, text) => {
  if(elem === null || elem === undefined) {
    return function(text) {
      return  console.log('%c '+text, 'font-size: 16px; font-weight: 700; color: coral;');
    };
  } else {
    return console.log('%c '+text, 'font-size: 16px; font-weight: 700; color: coral;', elem);
  }
};

cl('************************');
cl('The Ajax environment is up and running Baby');
cl('************************');

const d = document;
const b = d.body;
const w = window;
/*
let formFields = d.forms;
let formFields2 = d.getElementsByTagName('form')[0];
let formFields3 = d.forms.search;
let formFields4 = d.forms['search'];
let max = formFields.length;

cl(formFields[0], 'First form field');
cl(formFields2, 'First form field');
cl(formFields3, 'First form field');
cl(formFields4, 'First form field');

// ------------------------- //

let inputField = d.forms[0];
cl(inputField, 'Input field');

let sbmitButton = d.forms.submitButton;

inputField.value = "Search here";
inputField.addEventListener('focus', function() {
  if(!inputField.value.length)
    return;
    
  inputField.value = "";
});

inputField.addEventListener('blur', function() {
  if(inputField.value.length === 0)
    inputField.value = "";
    
  return;
});
*/

class HeroeForm {
  constructor($form) {
    this.form = $form;
    cl('heroeFormVar', $form);
    this.scopedThis = this;
  }

  focusOnFirstInput() {
    this.form.heroeName.focus();
  }
  
  storeValueFromForm() {
    cl('The form was submitted and storeValueFromForm() method called');
    
    this.storedValue = {};
    this.inputFields = this.form.children;
    this.inputCheckboxFields = this.form.powers;
    
    this.inputCheckboxesArray = Array.prototype.slice.call(this.inputCheckboxFields);
    this.inputCheckboxesArrayLength = this.inputCheckboxesArray.length - 1;
    this.inputRadioBtns = this.form.radioType;
    this.inputRadioBtnsLength = this.inputRadioBtns.length - 1;
    
    cl('checkboxes ', this.inputCheckboxFields);
    cl('checkbox as array ', this.inputCheckboxesArray[0].value);
    cl('checkbox array list\'s length', this.inputCheckboxesArrayLength);
    
    this.storedValue.herosName = this.inputFields[0].value;
    this.storedValue.heroesPower = this.inputFields[1].value;
    this.storedValue.heroesRealName = this.inputFields[2].value;
    this.storedValue.heroesCity = (this.inputFields.city.value === '') ? 'City unknown' : this.inputFields.city.value;
    
    this.storedValue.checkboxArray = [];
    this.storedValue.radioBtns = [];
    
    for(let i = 0; i <= this.inputCheckboxesArrayLength; i++) {
      cl('***** i value ****', i);
      if(this.inputCheckboxFields[i].name === 'powers' && this.inputCheckboxFields[i].checked === true) {
          this.storedValue.checkboxArray.push(this.inputCheckboxFields[i].value);
          cl('input array itens ', this.inputCheckboxFields[i].value);
          cl('in for loop input array ', this.inputCheckboxesArray);
      }
    }
    
    for(let j = 0; j <= this.inputRadioBtnsLength; j++) {
      if(this.inputRadioBtns[j].checked === true) {
        this.storedValue.radioBtns.push(this.inputRadioBtns[j].value);
      }
    }
      
    return alert(JSON.stringify(this.storedValue));
  }
  
  
  
  sendInfoThrough(data) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://reqr.es/api/isers', true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4 && xhr.status === 201) {
        cl('Ajax response simulated: ', xhr.resposeText);
      }
    };
        xhr.send(hero);
  }
  
  bindEvents() {
    cl('submit button ', this.form.submitButton );
    
    this.form.submitButton.addEventListener('click', this.storeValueFromForm, false);
  }
  
  init() {
    this.focusOnFirstInput();
    this.bindEvents();
  }
}

// Variables and instance creation
let $heroeForm = d.forms.superHeroeForm;
let heoreFormInstance = new HeroeForm($heroeForm);

heoreFormInstance.init();