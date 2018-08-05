// const axios = require('axios');
import axios from "axios";

const ParkingLotBashBoardAPI = {
  initServerData(dispatch, action) {
    this.getServerData(dispatch, action);
  },
  getServerData(dispatch, action) {
    // let getDataUrl = 'https://dino-parking-system-backend.herokuapp.com/parkingLots/dashboard';
    let getDataUrl ='http://localhost:8081/parkingLots/dashboard';
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