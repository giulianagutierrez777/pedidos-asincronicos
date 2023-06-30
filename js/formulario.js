window.onload = async () => {
    const $ = (id) => document.getElementById(id);
    let query = new URLSearchParams(location.search);
    let id = query.has("id") && query.get("id");
    try {
        let response = await fetch("http://localhost:3031/api/movies/" + id);
        let movie = await response.json();

        let {title, awards, length, release_date, rating} = movie.data;

        $("title").value = title;
        $("rating").value = rating;
        $("awards").value = awards;
        $("release_date").value = moment(release_date).format("YYYY-MM-DD");
        $("length").value = length;

        $("form").addEventListener("submit", async(e) => {
            e.preventDefault();
        })

        $("edit").addEventListener("click", async () => {
            try {
                
                let response = await fetch("http://localhost:3031/api/movies/update/" + id,{
                    method: "PUT",
                    body: JSON.stringify({
                        title : $("title").value,
                        rating : $("rating").value,
                        awards : $("awards").value,
                        release_date : $("release_date").value,
                        length : $("length").value,
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                let result = await response.json();
                console.log(result);

            } catch (error) {
                console.error;
            }
        })
        

        $("create").addEventListener("click", async () => {
            try {
                
                let response = await fetch("http://localhost:3031/api/movies/create",{
                    method: "POST",
                    body: JSON.stringify({
                        title : $("title").value,
                        rating : $("rating").value,
                        awards : $("awards").value,
                        release_date : $("release_date").value,
                        length : $("length").value,
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                let result = await response.json();
                console.log(result);

            } catch (error) {
                console.error;
            }
        })
        

        $("delete").addEventListener("click", async(e)=>{
            try {
                
                let response = await fetch("http://localhost:3031/api/movies/delete/" + id,{
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                let result = await response.json();
                console.log(result);

            } catch (error) {
                console.error;
            }
        })
        
    } catch (error) {
        console.error;
    }
}