const { chromium } = require('playwright');

const MOVIE_TARGET = "Spider-Man: Sin Camino a Casa";

const movieTeathers = [

    {
        name: "Cinepolis Mexicali Galerias",
        url: "https://cinepolis.com/preventas",
        preventaFilms: [],
        gettingFilm: async (page) => {
            const tickets = await page.$$('.preventa-data-layer');
            const preventaFilms = [];
            for(const ticket of tickets ){
                const title = await ticket.getAttribute("data-titulo");
                preventaFilms.push(title)
            }

            return preventaFilms;
        },
        checkPreventa: () => {
            return true
        }
    }

];

(async () => {

    const checkPreventa = (movies, target) => movies.includes(target)
  
  const browser = await chromium.launch({ headless: false, slowMo: 50 });
  //const browser = await chromium.launch();
  
  for(const movieTheater of movieTeathers) {
    const { name, url } = movieTheater
    const page = await browser.newPage();
    await page.goto(url);

    console.log(`Searching information from ${name}`);
    const movies = await movieTheater.gettingFilm(page);
    const isAvailable = checkPreventa(movies, MOVIE_TARGET); 
    console.log(isAvailable ? "Ya esta disponible" : "Aun no esta disponible sigue esperando");
}
  await browser.close();
})();  