window.onload = async () => {
  const $ = (id) => document.getElementById(id);
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  try {
    const response = await fetch('http://localhost:3031/api/movies')
    let peliculas = await response.json();
    let data = peliculas.data;
    let movies = sessionStorage.getItem('movies');

    data.forEach((movie) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length}`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      if (movie.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Genero: ${movie.genre.name}`;
        card.appendChild(genero);
      }
      card.appendChild(duracion);

      const a = document.createElement("a");

      a.setAttribute("href", `formulario.html?id=${movie.id}`);
      a.setAttribute("class", "botonAgregar");
      a.textContent = "Detalle";
      card.appendChild(a)

      const favorite = document.createElement("a");
      
      favorite.setAttribute("class", "botonAgregar");
      favorite.setAttribute("id", `movie${movie.id}`);

      if (movies && movies.includes(movie.id)){
        favorite.innerHTML = '<i class="fas fa-star" id="star"></i>'
      } else {
        favorite.innerHTML = '<i class="far fa-star" id="star"></i>'
      }

      card.appendChild(favorite)

      favorite.addEventListener("click", () => {
        const id = parseInt(favorite.id.substring(5));

        let ids = JSON.parse(sessionStorage.getItem('movies')) || [];

        if (ids.includes(id)) {
          ids = ids.filter((itemId) => itemId !== id);
          favorite.querySelector("i").classList.remove("fas");
          favorite.querySelector("i").classList.add("far");
        } else {
          ids.push(id);
          favorite.querySelector("i").classList.remove("far");
          favorite.querySelector("i").classList.add("fas");
        }

        sessionStorage.setItem('movies', JSON.stringify(ids));
      });
    });
  } catch (error) {
    console.error;
  }
  
};
