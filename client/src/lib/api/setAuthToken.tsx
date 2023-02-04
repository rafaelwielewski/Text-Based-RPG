
import http from '../services/http';
 
export const setAuthToken = token => {
   if (token) {
        console.log('token')
       http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
   }
   else
       delete http.defaults.headers.common["Authorization"];
}