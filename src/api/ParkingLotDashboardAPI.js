// const axios = require('axios');
import axios from "axios";
import * as url from '../constant/constant'

const ParkingLotBashBoardAPI = {
  initServerData(dispatch, action) {
    this.getServerData(dispatch, action);
  },
  getServerData(dispatch, action) {
    const token = localStorage.getItem("token")
        axios.defaults.headers.common['Authorization'] = token;
    let getDataUrl =url.URL+'/parkingLots/dashboard';
    axios
      .get(getDataUrl)
      .then((response) => {
        const data = response
          .data
          .map(serverData => {
            const {parkingLotName, size, carNum, parkingBoyName} = serverData;
            return {parkingLotName, size, carNum, parkingBoyName};
          });
        dispatch(action(data))
      })
      .catch(function (error) {
        if(error.response.status=='403'){
          // window.location.href = "/";
      }
      })
      .then(function () {});
  }
//   apiUrl: 'https://dino-parking-system-backend.herokuapp.com',

//     getAllEmployees(successCallBack) {
//         axios
//             .get(`${this.apiUrl}/users`)
//             .then(function (response) {
//                 successCallBack(response.data);
//             })
//             .catch(function (error) {
//                 console.log(error);
//             });
//     },
}
export default ParkingLotBashBoardAPI;