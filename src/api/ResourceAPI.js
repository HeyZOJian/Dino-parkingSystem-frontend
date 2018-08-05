import axios from 'axios';
import * as url from '../constant/constant'

const ResourceAPi = {
    apiUrl: url.URL,
    getAllEmployees(successCallBack) {
        const token = localStorage.getItem("token")
        axios.defaults.headers.common['Authorization'] = token;
        axios
            .get(`${this.apiUrl}/users`)
            .then(function (response) {
                successCallBack(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    addEmployee(employee, successCallBack) {
        axios.
            post(`${this.apiUrl}/users`, employee)
            .then(function (response) {
                console.log(response.data)
                successCallBack(response.status,response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    },

    modifyEmployeeInfo(employee, successCallBack) {
        axios.
            put(`${this.apiUrl}/users/${employee.id}`, employee)
            .then(function (response) {
                successCallBack(response.status);
            })
            .catch(function (error) {
                console.log(error);
            })
    },

    changeEmployeeStatus(employeeId, employeeStatus, successCallBack) {
        axios({
            method: 'patch',
            url: `${this.apiUrl}/users/${employeeId}`,
            headers: { 'content-type': 'application/json' },
            data: employeeStatus
        })
            .then(function (response) {
                successCallBack(response.status);
            })
            .catch(function (error) {
                console.log(error);
            })
    },

    getAllParkingLots(successCallBack) {
        axios
            .get(`${this.apiUrl}/parkingLots`)
            .then(function (response) {
                successCallBack(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    getAllOrders(successCallBack) {
        axios
            .get(`${this.apiUrl}/orders`)
            .then(function (response) {
                successCallBack(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    getAllParkingBoys(successCallBack) {
        axios
            .get(`${this.apiUrl}/parkingBoys`)
            .then(function (response) {
                successCallBack(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    dispatchOrder(orderId, parkingBoyId, successCallBack) {
        axios
            .put(`${this.apiUrl}/orders/${orderId}`, {
                "status": "waitPark",
                "parkingBoyId": parkingBoyId
            })
            .then(function (response) {
                successCallBack(response.status);
            })
            .catch(function (error) {
                successCallBack(error.response.status)
            });
    },

    getNoManagedParkingLots(successCallBack) {
        axios
            .get(`${this.apiUrl}/parkingLots/?noParkingBoy=true`)
            .then(function (response) {
                successCallBack(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    getParkingLotsByParkingBoyId(id, successCallBack) {
        axios
            .get(`${this.apiUrl}/parkingBoys/${id}/parkingLots`)
            .then(function (response) {
                successCallBack(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    addParkingLot(parkingLot, successCallBack) {
        axios.
            post(`${this.apiUrl}/parkingLots`, parkingLot)
            .then(function (response) {
                successCallBack(response.status);
            })
            .catch(function (error) {
                console.log(error);
            })
    },

    modifyParkingLotInfo(parkingLot, successCallBack) {
        axios.
            put(`${this.apiUrl}/parkingLots/${parkingLot.id}`, parkingLot)
            .then(function (response) {
                successCallBack(response.status);
            })
            .catch(function (error) {
                console.log(error);
            })
    },
    changeParkingLotStatus(parkingLotId, parkingLotStatus, successCallBack) {
        axios({
            method: 'patch',
            url: `${this.apiUrl}/parkingLots/${parkingLotId}`,
            headers: { 'content-type': 'application/json' },
            data: parkingLotStatus
        })
            .then(function (response) {
                successCallBack(response.status);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
}

export default ResourceAPi;