
export { removemovie } from "../reducer/movieSlice";
import axios from "../../../Utils/Axios";
import { loadmovie } from "../reducer/movieSlice";

export const loadmovies = (id) => async (dispatch) => {
    try {
        const detail = await axios.get(`/movie/${id}`)
        const extarnalids = await axios.get(`/movie/${id}/external_ids`)
        const recommendations = await axios.get(`/movie/${id}/recommendations`)
        const similar = await axios.get(`/movie/${id}/similar`)
        const videos = await axios.get(`/movie/${id}/videos`)
        const watchproviders = await axios.get(`/movie/${id}/watch/providers`)

        let ultimatedata = {
            detail: detail.data,
            extarnalids: extarnalids.data,
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            videos: videos.data.results.find((m) => m.type === "Trailer"),
            watchproviders: watchproviders.data.results.IN
        }
        
    dispatch(loadmovie(ultimatedata))
       console.log(ultimatedata)

    } catch (error) {
        console.log("Error:" + error)
    }

    
}




