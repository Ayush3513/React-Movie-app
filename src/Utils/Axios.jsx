import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNGVkNmY0MGMzMmMxMThkNmIxZWUwNmMzOTdlNjA3YiIsIm5iZiI6MTcyMzA5NjI5Mi4yNDQ0NSwic3ViIjoiNjZiNDU5OTEwYmNiNDcyYjE0ZTkzNDMwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.WNyZv4zpjQtz0ZPjTmbDN9jrdsjMwCDiMa_hBzvOsPA'
          }

})

export default instance;