
export { removeperson } from "../reducer/personSlice";
import axios from "../../../Utils/Axios";
import { loadperson } from "../reducer/personSlice";

export const loadpersons = (id) => async (dispatch) => {


    try {
        const detail = await axios.get(`/person/${id}`)
        const extarnalids = await axios.get(`/person/${id}/external_ids`)
        const combinedcredits = await axios.get(`person/${id}}/combined_credits`)
        const moviecredits = await axios.get(`person/${id}}/movie_credits`)
        const tvcredits = await axios.get(`person/${id}}/tv_credits`)
      

        let ultimatePdata = {
            detail: detail.data,
            extarnalids: extarnalids.data,
            combinedcredits: combinedcredits.data,
            moviecredits: moviecredits.data,
            tvcredits: tvcredits.data,
    
        }
        
    dispatch(loadperson(ultimatePdata))
       

    } catch (error) {
        console.log("Error:" + error)
    }

    
}




