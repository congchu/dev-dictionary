import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_API,
    timeout: 5000,
    headers: { 'Authorization': `Bearer ${process.env.REACT_APP_SERVER_KEY}` }
});


export const fetchMatchedWord = (word: string) => {
    return instance.get(``, { params: { View: "Default", filterByFormula: `OR("${word}"=name,"${word}"=synonym)` } })
        .then(function (response) {
            if (response.data.records && response.data.records.length > 0) {
                return response.data.records[0];
            }
            else {
                return "";
            }
        });
}

export const fetchIncludedWords = (word: string) => {
    return instance.get(``, { params: { View: "Default", filterByFormula: `FIND("${word}",synonym) > 0` } })
        .then(function (response) {
            console.log(response.data);
            return response.data.records
        });
}
