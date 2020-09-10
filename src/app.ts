const button = document.querySelector('button')!;

//a comment
function clickHandler(message : string){
    //let userName = 'Nandu';
    alert("Clicked!! "+message);
}

button.addEventListener('click',clickHandler.bind(null,"on the button"))