var hp2;
let myChart;
var def=["default","default"];

const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
        
    fetch(url).then((res) => {
        if (res.status != "200") {
            pokeImage("./sad-pikachu.gif");
            grafic(0,0,0,0,0,0);
            pokeWeight("no data");
            pokeHeight("no data");
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            //console.log(data);
            //Obtenemos la imagen de la API.
            let pokeImg = data.sprites.other.home.front_default;
            pokeImage(pokeImg);
            //Peso del pokemon.
            let weight= data.weight;
            pokeWeight(weight);
            //console.log(weight);
            //Altura del pokemon.
            let height= data.height;
            pokeHeight(height);
            //console.log(height);
            //Se toma la naturaleza del pokemon.
            let types = data.types;
            pokeTypes(types);
            //console.log(types);
            //Se toma las estadisticas del pokemon.
            let hp = data.stats[0].base_stat;
            let attack = data.stats[1].base_stat;
            let defense = data.stats[2].base_stat;
            let specialAttack = data.stats[3].base_stat;
            let specialDefense = data.stats[4].base_stat;
            let speed = data.stats[5].base_stat;
            // Se mandan las stats a la grafica.
            grafic(hp,attack,defense,specialAttack,specialDefense,speed);
              
        }
    });
}

const typePok =  {
    steel: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Acero_Pokemon.svg',
    water: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Agua_Pokemon.svg',
    bug: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Bicho_Pokemon.svg',
    dragon: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Dragón_Pokemon.svg',
    electric: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Eléctrico_Pokemon.svg',
    ghost: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Fantasma_Pokemon.svg',
    fire: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Fuego_Pokemon.svg',
    fairy: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Hada_Pokemon.svg',
    ice: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Hielo_Pokemon.svg',
    fighting: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Lucha_Pokemon.svg',
    normal: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Normal_Pokemon.svg',
    grass: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Planta_Pokemon.svg',
    psychic: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Ps%C3%ADquico_Pokemon.svg', 
    rock: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Roca_Pokemon.svg',
    dark: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Siniestro_Pokemon.svg',
    ground: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Tierra_Pokemon.svg',
    poison: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Veneno_Pokemon.svg',
    flying: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Volador_Pokemon.svg',    
    default: '/.fondo_transparente_png_by_imsnowbieber_d3jme6i-fullview.png'
};
const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;     
}
const pokeWeight = (weight) => {
    const newWeight = (weight/10 + ' kg');
    const pokeWeight = document.getElementById('pokeWeight').innerHTML = newWeight;
 }
const pokeHeight = (height) => {
    const newHeight = (height/10 + ' m')
    const pokeHeight = document.getElementById("pokeHeight").innerHTML = newHeight;
}
const pokeTypes = (types) => {
    const typeOne = typePok[types[0].type.name];
    const typeTwo = types[1] ? typePok[types[1].type.name] : typePok.default;
    const pokeTypeOne = document.getElementById("pokeType").src = typeOne;
    const pokeTypeTwo = document.getElementById("pokeType2").src = typeTwo;
}
var grafic = (hp,attack,defense,specialAttack,specialDefense,speed) =>{
    var ctx= document.getElementById("Stats").getContext("2d");
    if (myChart) {
        myChart.destroy();
    }
    myChart = new Chart(ctx,{
        type: "polarArea",
        data:{
            labels:['HP','Attack','Defense','Special Attack','Special Defense','Speed'],
            datasets:[{
                label: "",
                data:[hp,attack,defense,specialAttack,specialDefense,speed],
                backgroundColor: ['rgb(215,242,255,0.5)',
                                  'rgb(161,195,73,0.5)',
                                  'rgb(194,72,66,0.5)',
                                  'rgb(209,209,209,0.5)',
                                  'rgb(82,82,233,0.5)',
                                  'rgb(247,175,247,0.5)'
                ]   
            }],  
        },
        options: { 
            responsive:true,
            plugins:{                   
                legend: {
                    display:false
                    //position:"right",
                    //labels:{
                    //    padding:25
                    //}
                }
            }
        }
    })
}