import axios from "axios";

const baseUrl = "http://localhost:5133/api/Whois";

export const whoIPService = {

    getDetails: async function (domain, type) {
      const response = await axios.get(`${baseUrl}?domain=${domain}&type=${type}`,{
        'Access-Control-Allow-Origin': '*',
      });
      return response;
    },

  };
  