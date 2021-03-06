import {HTTP} from "./http-commons";
import {API_PATH} from "../config/config";
import Qs from "qs";

const DirectorsService = {
    fetchDirectors: async function() {
        try {
            return await HTTP.getInstance()
                .get(`http://${API_PATH}/directors/getDirectors`)
                .then(response => Qs.parse(response.data))
        } catch (error) {
            throw error
        }
    },

    getADirector: async function(id) {
        try {
            return await HTTP.getInstance().get(`http://${API_PATH}/directors/getDirector/${encodeURIComponent(id)}`)
        } catch (error) {
            throw error
        }
    },

    createDirector: async function(nomRea, prenRea) {
        try {
            return await HTTP.getInstance().post(`http://${API_PATH}/directors/insertDirector`, {nomRea, prenRea})
        } catch (error) {
            throw error
        }
    },

    editDirector: async function(noRea, nomRea, prenRea) {
        try {
            return await HTTP.getInstance().put(`http://${API_PATH}/directors/updateDirector`, {noRea, nomRea, prenRea})
        } catch (error) {
            throw error
        }
    },

    deleteDirector: async function(id) {
        try {
            return await HTTP.getInstance().delete(`http://${API_PATH}/directors/deleteDirector/${encodeURIComponent(id)}`)
        } catch (error) {
            throw error
        }
    }
}

export default DirectorsService