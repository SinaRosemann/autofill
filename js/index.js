const search = document.getElementById('search');
const result = document.getElementById('result');

const searchStates = async searchText => {
    const data = await fetch('https://github.com/SinaRosemann/autofill/blob/master/data/states.json');
    const states = await data.json();
    
    // Filter matches

    let matches = states.filter(state => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return state.name.match(regex);
    });

    if(searchText.length === 0){
        matches = [];
        result.innerHTML = '';
    }

    output(matches);
}

const output = matches => {
    if(matches.length > 0){
        const html = matches.map(match => `
            <div id="result__state">
            <h2>${match.name}</h2>
            <p>CAPITAL: ${match.capital}</p>
            <p>POPULATION: ${match.population}</p>
            <p>SIZ in km2: ${match.size}</p>
            </div>
            `
            ).join('')
            result.innerHTML = html;
    }
}

search.addEventListener('input', () => searchStates(search.value));
