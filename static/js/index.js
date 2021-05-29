

let countPokes = 0


const pokeList = document.querySelector(".poke__list")
const pokeDetails = document.querySelector(".pokemon__main--container")

const backButton = document.querySelector(".back__button")

let OldScroll;

const openDetails = (event,id) => {
    OldScroll = window.scrollY
    console.log("add")
    pokeDetails.style.display = 'flex'
    pokeList.style.display = 'none'
    document.querySelector("main").style.width = "100vw"
    

    const TotalX = pokeDetails.scrollLeft + 200
    const TotalY = pokeDetails.scrollTop



    window.scrollTo(TotalX, TotalY)


    renderPoke(id)
}


const backToList = () => {
    pokeList.style.display = 'flex'
    pokeDetails.style.display = 'none'
    document.querySelector("main").style.width = "100vw"
    window.scrollTo(0, OldScroll)
    console.log("back")

}




const controlPages = () => {
    // 620 + 100
    let scrollY = (window.scrollY + 100) + (600 - (page * (20 + page)))

    let fullHigh =  window.innerHeight * page

    // console.log(scrollY, " > ",fullHigh)

    if(scrollY >=  fullHigh){
        console.log("gerando")
        page += 1

        genPokes(page)
    }
}


let page = 1


const addListeners = () => {
    const pokes = document.querySelectorAll(".poke")
    pokes.forEach((element,index) => element.addEventListener('click', (event) => { openDetails(event,index + 1) }))
    backButton.addEventListener('click', () => { console.log("add") , backToList() })

    window.addEventListener("scroll",() => {
        controlPages()
    })
}


const capitalize = (string) => {
    let NewString = string
    NewString = NewString.split("")
    NewString[0] = NewString[0].toUpperCase()
    return NewString.join('')
}

const genPokes = () => {

    const url = `https://pokeapi.co/api/v2/pokemon?limit=${6}&offset=${countPokes}`


    fetch(url).then((res) => res.json()).then(
        data => {
            let pokesHTML = data.results.map((element, index) => {

                countPokes ++

                return `<div class="poke">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${countPokes}.png" 
                alt="${capitalize(element.name)}" data-id="${index + 1}"/>
                <span>${capitalize(element.name)}</span>
                </div>`
            }
            )

            pokesHTML = pokesHTML.join().replaceAll(',',"")
            pokeList.innerHTML += pokesHTML

            addListeners()
        }
    )

    // let pokesHTML = res.results.map((element,index) => `<div class="poke">
    //             <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png" 
    //             alt="${capitalize(element.name)}" data-id="${index + 1}"/>
    //             <span>${capitalize(element.name)}</span>
    //             </div>`
    //         )




}

genPokes()



// Poke

const colours = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
};

const statsContainer = document.querySelector(".poke__details__stats--container")


const pokeName = document.querySelector(".poke__display__name")

const renderPoke = async (id) => {
    console.log(id)
    const req = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    const res = await req.json()
    console.log(res)
    

    const type = res.types[0].type.name

    const stats = res.stats.map((element,index) => {
        console.log(element)
        return(
            `
            <div class="poke__details__stats__bar--container" data-stat="${element.base_stat}">
                        <span>
                            ${element.stat.name.toUpperCase()}: 
                        </span>
                        <div class="poke__details__stats__bar">
                            <div class="BarWidth" id="${index}"  style="background-color:${colours[type]}; width:${element.base_stat}%">
                            </div>
                        </div>
                    </div>
                `
        )
    })

    pokeName.innerHTML = capitalize(res.name)
    statsContainer.innerHTML = stats.join().replaceAll(',',"")
}