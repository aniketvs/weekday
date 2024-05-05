import axios from "axios";
import { addData, getBasePay, getExp, getRole, saveData } from "../../../store/slice/cardSlice";
import { store } from "../../../store/store";

export const fetchCardData=(limit,setLoading)=>{
    const body={
        "limit": 9,
        "offset": limit
       };
   axios.post("https://api.weekday.technology/adhoc/getSampleJdJSON",body).then((res)=>{

if(limit==0){
store.dispatch(saveData(res.data.jdList));
}else{
    store.dispatch(addData(res.data.jdList));
}

store.dispatch(getRole());
store.dispatch(getExp());
store.dispatch(getBasePay());
setLoading(false);
   }).catch((err)=>{
    console.log(err)
   })
}