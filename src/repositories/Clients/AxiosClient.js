import axios from "axios";

const baseDomain = "http://localhost:8000";
const baseURL = `${baseDomain}`; // Incase of /api/v1;

const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;

// ALL DEFUALT CONFIGURATION HERE

export default axios.create({
    baseURL,
    headers: {
        Authorization: `Bearer ${token}`
    }
});