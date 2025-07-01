let sectionSeleccionarAtaque=document.getElementById('seleccionar-ataque')
let botonMascotaJugador = document.getElementById('boton-mascota')
let botonReiniciar=document.getElementById('boton-reiniciar')

let sectionSeleccionarMascota=document.getElementById('seleccionar-mascota')
let spanMascotaJugador=document.getElementById('mascota-jugador')

let spanMascotaEnemigo=document.getElementById('mascota-enemigo')

const spanVidasJugador=document.getElementById('vidas-jugador')
const spanVidasEnemigo=document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataqueDelJugador = document.getElementById('ataque-del-jugador')
const ataqueDelEnemigo = document.getElementById('ataque-del-enemigo')
const contenedorTarjetas=document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionVerMapa=document.getElementById('ver-mapa')
const mapa=document.getElementById('mapa')

let mokepones=[]
let ataqueJugador=[]
let ataqueEnemigo=[]
let opcionDeMokepones

let inputHipodoge
let inputCapipepo
let inputRatigueya

let mascotaJugador
let ataquesMokepon
let ataquesMokeponEnemigo

let botonFuego
let botonAgua
let botonTierra

let botones=[]
let indexAtaqueJugador
let indexAtaqueEnemigo

let victoriasJugador=0
let victoriasEnemigo=0

let vidasJugador=3
let vidasEnemigo=3

let lienzo=mapa.getContext("2d")

class Mokepon{
    constructor(nombre, foto, vida){
        this.nombre=nombre
        this.foto=foto
        this.vida=vida
        this.ataques=[]
    }
}

let hipodoge=new Mokepon('Hipodoge','./assets/hipodoge_attack.webp',5)
let capipepo=new Mokepon('Capipepo','./assets/capipepo_attack.webp',5)
let ratigueya=new Mokepon('Ratigueya','./assets/ratigueya_attack.webp',5)


hipodoge.ataques.push(
    {nombre: '🌊',id: 'boton-agua'},
    {nombre: '🌊',id: 'boton-agua'},
    {nombre: '🌊',id: 'boton-agua'},
    {nombre: '🔥',id: 'boton-fuego'},
    {nombre: '🪨',id: 'boton-tierra'},
)

capipepo.ataques.push(
    {nombre:'🪨',id:'boton-tierra'},
    {nombre:'🪨',id:'boton-tierra'},
    {nombre:'🪨',id:'boton-tierra'},
    {nombre:'🌊',id:'boton-agua'},
    {nombre:'🔥',id:'boton-fuego'},
)

ratigueya.ataques.push(
    {nombre:'🔥',id:'boton-fuego'},
    {nombre:'🔥',id:'boton-fuego'},
    {nombre:'🔥',id:'boton-uego'},
    {nombre:'🌊',id:'boton-agua'},
    {nombre:'🪨',id:'boton-tierra'},
)

mokepones.push(hipodoge,capipepo,ratigueya)

function iniciarJuego(){
    sectionSeleccionarAtaque.style.display='none'
    sectionVerMapa.style.display='none'

    mokepones.forEach(

        (mokepon) => {
            opcionDeMokepones=`
            <input type="radio" name="mascota" id="${mokepon.nombre}" />
            <label class="tarjeta-de-mokepon" for="${mokepon.nombre}">
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt="${mokepon.nombre}">
            </label>
            `
            contenedorTarjetas.innerHTML+=opcionDeMokepones

            inputHipodoge=document.getElementById('Hipodoge')
            inputCapipepo=document.getElementById('Capipepo')
            inputRatigueya=document.getElementById('Ratigueya')
        }
    )

    botonMascotaJugador.addEventListener('click',selecionarMascotaJugador)

    botonReiniciar.addEventListener('click',reiniciarJuego)
    botonReiniciar.style.display='none'
}

function selecionarMascotaJugador(){

    sectionSeleccionarMascota.style.display='none'
    //sectionSeleccionarAtaque.style.display='flex'
    sectionVerMapa.style.display='flex'
    let imagenDeCapipepo=new Image()
    imagenDeCapipepo.src=capipepo.foto
    lienzo.drawImage(
        imagenDeCapipepo,
        20,
        40,
        100,
        100)    

    if(inputHipodoge.checked){
        spanMascotaJugador.innerHTML=inputHipodoge.id
        mascotaJugador=inputHipodoge.id
    }else if(inputCapipepo.checked){
        spanMascotaJugador.innerHTML=inputCapipepo.id
        mascotaJugador=inputCapipepo.id
    }else if(inputRatigueya.checked){
       spanMascotaJugador.innerHTML=inputRatigueya.id
       mascotaJugador=inputRatigueya.id
    }else{
        alert("Misigno?")
    }
    extraerAtaques(mascotaJugador)
    seleccionarMascotaEnemigo()
}

function extraerAtaques(mascotaJugador){
    let ataques
    for(let i=0;i<mokepones.length;i++){
        if(mascotaJugador === mokepones[i].nombre){
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        ataquesMokepon=`
        <button id =${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML+=ataquesMokepon
    })

    botonFuego=document.getElementById('boton-fuego')
    botonAgua=document.getElementById('boton-agua')
    botonTierra=document.getElementById('boton-tierra')
    botones=document.querySelectorAll('.BAtaque')

}

function secuenciaAtaque(){
    botones.forEach((boton)=>{
        boton.addEventListener('click', (e)=>{
            if(e.target.textContent ==='🔥'){
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#112F58'
                boton.disabled=true
            }else if(e.target.textContent === '🌊'){
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#112F58'
                boton.disabled=true
            }else{
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#112F58'
                boton.disabled=true
            }
            ataqueAleatorioEnemigo()
        })
    })
    
}

function seleccionarMascotaEnemigo(){

    let mascotaAleatorio=aleatorio(0,mokepones.length-1)

    spanMascotaEnemigo.innerHTML=mokepones[mascotaAleatorio].nombre
    ataquesMokeponEnemigo=mokepones[mascotaAleatorio].ataques
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo(){
    
    let ataqueAleatorio=aleatorio(0,ataquesMokeponEnemigo.length-1)

    if(ataqueAleatorio==0 || ataqueAleatorio==1){
        ataqueEnemigo.push('FUEGO')
    }else if(ataqueAleatorio==3 || ataqueAleatorio==4){
        ataqueEnemigo.push('AGUA')
    }else{
        ataqueEnemigo.push('TIERRA')
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea(){
    if(ataqueJugador.length===5){
        combate()
    }
}

function indexAmbosOponentes(jugador,enemigo){
    indexAtaqueJugador=ataqueJugador[jugador]
    indexAtaqueEnemigo=ataqueEnemigo[enemigo]
}

function combate(){

    for(let index=0;index<ataqueJugador.length;index++){
        if(ataqueJugador[index]===ataqueEnemigo[index]){
            indexAmbosOponentes(index,index)
            crearMensaje("Empate 👽")    
        }
        else if(ataqueJugador[index]==='FUEGO' && ataqueEnemigo[index]==='TIERRA'){
            indexAmbosOponentes(index,index)
            crearMensaje("Ganaste 🎉")
            victoriasJugador++
            spanVidasJugador.innerHTML=victoriasJugador
        }
        else if(ataqueJugador[index]==='AGUA' && ataqueEnemigo[index]==='FUEGO'){
            indexAmbosOponentes(index,index)
            crearMensaje("Ganaste 🎉")
            victoriasJugador++
            spanVidasJugador.innerHTML=victoriasJugador
        }
        else if(ataqueJugador[index]==='TIERRA' && ataqueEnemigo[index]==='AGUA'){
            indexAmbosOponentes(index,index)
            crearMensaje("Ganaste 🎉")
            victoriasJugador++
            spanVidasJugador.innerHTML=victoriasJugador
        }
        else{
            indexAmbosOponentes(index,index)
            crearMensaje("Perdiste 👹")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML=victoriasEnemigo
        }
    }
/*    
    if(ataqueJugador==ataqueEnemigo){
        crearMensaje("Empate 👽")
    }
    else if(ataqueJugador == 'FUEGO' && ataqueEnemigo =='TIERRA'){
        crearMensaje("Ganaste 🎉")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML=vidasEnemigo
    }
    else if(ataqueJugador == 'AGUA' && ataqueEnemigo =='FUEGO'){
        crearMensaje("Ganaste 🎉")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML=vidasEnemigo
    }
    else if(ataqueJugador == 'TIERRA' && ataqueEnemigo =='AGUA'){
        crearMensaje("Ganaste 🎉")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML=vidasEnemigo
    }else{
        crearMensaje("Perdiste 👹")
        vidasJugador--
        spanVidasJugador.innerHTML=vidasJugador
    }   
*/
    revisarVictorias()
}

function revisarVictorias(){

    let botonReiniciar=document.getElementById('boton-reiniciar')
    
    if (victoriasJugador===victoriasEnemigo){
        crearMensajeFinal("Esto fue un empate 👽")
    }
    else if(victoriasJugador>victoriasEnemigo){
        crearMensajeFinal(("Felicitaciones ! Ganaste 🎎"))
        botonReiniciar.style.display='block'
    }
    else{
        crearMensajeFinal("Lo siento, perdiste 🎃")
        botonReiniciar.style.display='block'
    }
}

function crearMensaje(resultado){

    let nuevoAtaqueDelJugador=document.createElement('p')
    let nuevoAtaqueDelEnemigo=document.createElement('p')

    sectionMensajes.innerHTML=resultado
    nuevoAtaqueDelJugador.innerHTML=indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML=indexAtaqueEnemigo

    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)

}
function crearMensajeFinal(resultadoFinal){

    let parrafo=document.createElement('p')
    parrafo.innerHTML=resultadoFinal
}

function reiniciarJuego(){
    location.reload()
}

function aleatorio(min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

window.addEventListener('load',iniciarJuego) 