
const billInputArea = document.getElementById('bill-input');

/*buttons*/
const fivePercent = document.querySelector('.five-percent');
const tenPercent = document.querySelector('.ten-percent');
const fifteenPercent = document.querySelector('.fifteen-percent');
const twentyFivePercent = document.querySelector('.twentyfive-percent');
const fiftyPercent = document.querySelector('.fifty-percent');
const customTip =  document.getElementById('custom-tip');


//Numer of People Input 
const formWarning =  document.querySelector('.form-warning');
const numberOfPeople= document.getElementById('num-of-people');

const tipPerPerson =  document.querySelector('.tip-per-person');
const totalPerPerson = document.querySelector('.total-per-person');


//Reset button
const resetButton = document.querySelector('.reset');


//Global Variables
let bill = 0;
let tip = 0;
let numOfPeopleVar = 0

formWarning.style.display = 'none';

//Type Checking
function isNumber(value) {
    return typeof value === 'number';
  }

//Rounding to two decimal points.
function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}


//Calculating and displaying tip-per-person and total-per-person.
function calcTipTotal(){

    if(numOfPeopleVar <= 0){
        formWarning.style.display = 'flex';
        numberOfPeople.style.border ='2px solid red';
      }

    if(numOfPeopleVar){
        formWarning.style.display = 'none';
        tipPerPerson.innerHTML = `$ ${roundToTwo(tip/numOfPeopleVar)}`;
        totalPerPerson.innerHTML =`$ ${roundToTwo((tip+bill)/numOfPeopleVar)}`;
    }
}


//Calculating the Tip amount.
function calcTip(){
    
    if(btnStack.buttonStack.length === 1)
    { 
        tip =  bill * (btnStack.buttonStack[0].value / 100);

    }
    console.log(bill, tip)
}


// Constructor function to maitain tip Stack.
class Stack {

    constructor(){
      this.buttonStack = []
    }

    push(btnObject){
        this.buttonStack.push(btnObject)
        
       if (btnObject.button.tagName.toLowerCase() === 'button') {
              customTip.value ='Custom'
              btnObject['button'].style.backgroundColor = 'hsl(185, 41%, 84%)';
              btnObject['button'].style.color = 'hsl(183, 100%, 15%)'
        }
        calcTip();
        calcTipTotal();
        
        
    }

    pop(){
        if(this.buttonStack.length === 1){
            const prevButton =this.buttonStack.pop()
            if (prevButton.button.tagName.toLowerCase() === 'button') {
                 prevButton['button'].style.backgroundColor = 'hsl(183, 100%, 15%)';
                 prevButton['button'].style.color = 'hsl(0, 0%, 100%)';
                 prevButton['button'].style = "";  //removing the inline styling.
                 
            }
        }
    } 
}
const btnStack = new Stack();



//Bill Input Area Events
billInputArea.addEventListener('click',(event)=>{
     event.target.value ="";
});


billInputArea.addEventListener('input',(event)=>{
      bill = Number(event.target.value)
      calcTip();
      if(numOfPeopleVar!=0){
        calcTipTotal()
      }
});


/* Tip button click */
fivePercent.addEventListener('click',()=>{
     btnStack.pop();
     btnStack.push({ button : fivePercent,
                    value : 5 })
     
});


tenPercent.addEventListener('click',()=>{
    btnStack.pop();
    btnStack.push({ button : tenPercent,
        value : 10 })
});


fifteenPercent.addEventListener('click',()=>{ 
     btnStack.pop();
     btnStack.push({ button : fifteenPercent,
        value : 15 })
});

twentyFivePercent.addEventListener('click',()=>{  
    btnStack.pop();
    btnStack.push({ button : twentyFivePercent,
        value : 25 })
});


fiftyPercent.addEventListener('click',()=>{
    btnStack.pop();
    btnStack.push({ button : fiftyPercent,
        value : 50 });
});

customTip.addEventListener('click',(event)=>{
    event.target.value ="";
});

customTip.addEventListener('input',(event)=>{
   
        tip  = Number(event.target.value);
        console.log(bill,tip)
        btnStack.pop();
        calcTipTotal()
         // btnStack.push({ button : customTip,
        //     value : Number(event.target.value) });
});


/*Number of People*/
numberOfPeople.addEventListener('click',(event)=>{
    event.target.value ="";

});

numberOfPeople.addEventListener('input',(event)=>{

   numOfPeopleVar = Number(event.target.value);
   
   
   calcTipTotal();

   console.log()
   
})


/* Reset Button */
resetButton.addEventListener('click',()=>{
      bill=0;
      tip=0;
      btnStack.pop();
      billInputArea.value = '0';
      customTip.value = 'custom';
      numberOfPeople.value = '0';
      tipPerPerson.innerHTML = `$ 0.00`;
      totalPerPerson.innerHTML =`$ 0.00`;
      formWarning.style.display = 'none';
})