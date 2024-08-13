
export { removetv } from "../reducer/tvSlice";
import axios from "../../../Utils/Axios";
import { loadtv } from "../reducer/tvSlice";

export const loadtvs = (id) => async (dispatch) => {
    try {
        const detail = await axios.get(`/tv/${id}`)
        const extarnalids = await axios.get(`/tv/${id}/external_ids`)
        const recommendations = await axios.get(`/tv/${id}/recommendations`)
        const similar = await axios.get(`/tv/${id}/similar`)
        const videos = await axios.get(`/tv/${id}/videos`)
        const watchproviders = await axios.get(`/tv/${id}/watch/providers`)

        let bigData = {
            detail: detail.data,
            extarnalids: extarnalids.data,
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            videos: videos.data.results.find((m) => m.type === "Trailer"),
            watchproviders: watchproviders.data.results.IN
        }
        
    dispatch(loadtv(bigData))       

    } catch (error) {
        console.log("Error:" + error)
    }

    
}




