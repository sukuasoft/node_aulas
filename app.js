const v1='teste';
let v2 =true;


//operacoes
// relacionais, logicas, aritmeticas
//relacionais -> <, >, ==, >=, <=, !=
//logicias -> &&, ||, !
//aritmeticas -> +, -, *, /, % 
let a = 5+5;


//saida e entrada (x).

console.log(a);


//estruturas condicionais e repeticacao
// if, switch, while, for

const lista = [1, 2, 3, 4, 5];

const v4 = 5;

switch (v4) {
    case 0:
        console.log('é igual a 0')
        break;
    case 1:
        console.log('é igual a 1')
        break;
    case 2:
        console.log('é igual a 2');
  
}

//in
for(item of lista){
    console.log(item);
}
console.log('------------------');

for(let x =0; x < lista.length; x++){
    console.log(lista[x]);
}


// listas
const lista2 = [1, 2, 3, 4, 5, ];
lista2.push('teste');
lista2.splice(lista2.indexOf('teste'), 1)
lista2.length;


//objectos
const obj = {
    name: 'teste', 
    idade: 10, 
    adicionar: function (){

    }
};

obj.adicionar();
obj.idade;

// functions
function avancar (){

}