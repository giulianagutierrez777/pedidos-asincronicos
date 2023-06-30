window.onload = async () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  try {
    const response = await fetch('http://localhost:3031/api/movies')
    let peliculas = await response.json();
    let data = peliculas.data;
    let movies = sessionStorage.getItem('movies');
    if(JSON.parse(movies).length){

      data.forEach((movie) => {
        if (movies && movies.includes(movie.id)) {
  
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
          card.appendChild(a);
        }  
      })

    } else {
      const h1 = document.createElement("h2")
      h1.innerHTML = "No tienes peliculas favoritas"
      container.appendChild(h1);
    }

  } catch (error) {
    console.error;
  }

};
