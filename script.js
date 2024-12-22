const allcheckbox=document.querySelectorAll('.custom-check');
const inputfilled=document.querySelectorAll('.inputgoal')
const errorlable=document.querySelector('.error-label')
const progessval=document.querySelector('.progessval')
const progee=document.querySelector('.progess-bar')
const progressquote=document.querySelector('.progress-label')
// let count=0;

const quotes=['Raise the bar by completing your goals!',
    'Just a step away, keep going!,',
    'Keep Going, You’re making great progress!',
     'woww goal completed'];
const goal=JSON.parse(localStorage.getItem('goal'))||{
    first:{
        name:' ',
        completed:false,
    },
    second:{
        name:'',
        completed:false,
    },
    third:{
        name:'',
        completed:false,
    }
}
let completedGoalCount=Object.values(goal).filter((goal)=>goal.completed).length
progressquote.innerText=quotes[completedGoalCount];

progessval.style.display='block';
progessval.style.width=`${(completedGoalCount / inputfilled.length) * 100}%`
progessval.firstElementChild.innerText=`${completedGoalCount}/3 completed`


allcheckbox.forEach((checkbox)=>{
    checkbox.addEventListener('click',(e)=>{
        const filledinput=[...inputfilled].every(function(input){
            return input.value;

        })
        if(filledinput){
      checkbox.parentElement.classList.toggle('completed')
       const inputid=checkbox.nextElementSibling.id;
       goal[inputid].completed=!goal[inputid].completed;
       completedGoalCount=Object.values(goal).filter((goal)=>goal.completed).length
       progressquote.innerText=quotes[completedGoalCount];
       progessval.style.display='block';
       progessval.style.width= `${(completedGoalCount / inputfilled.length) * 100}%`
       
      progessval.classList.add('completed');
    progessval.firstElementChild.innerText=`${completedGoalCount}/3 completed`
    // progessval.firstElementChild.style.opacity='1';
       localStorage.setItem('goal',JSON.stringify(goal));
    //   count++;
      
   
   
        }
        else{
            // errorlable.style.display='block'
            progee.classList.add('showerror')
            
        }
        // if(count==1){
        //     progessval.style.display='block';
        //     progessval.style.width='33%';
        //   }
      
        
    })
})
inputfilled.forEach((input)=> {

    input.value=goal[input.id].name;
    if(goal[input.id].completed){
        input.parentElement.classList.add('completed')
    }
    input.addEventListener('focus',()=>{
        progee.classList.remove('showerror')
    })
    input.addEventListener('input',(e)=>{
        if(goal[input.id].completed){
            input.value=goal[input.id].name;
            return
        }
        goal[input.id]={
            name:input.value,
           
        }
       localStorage.setItem('goal',JSON.stringify(goal))


    })
})