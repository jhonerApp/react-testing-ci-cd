import "./App.css";
import React, { useState } from "react";
import { whoIPService } from "./services/whoisAPI.service";

function App() {
  const [inputDomain, setInputDomain] = useState("");
  const [type, setType] = useState("domain");
  const [value, setValue] = useState(null);
  const [datas, setDatas] = useState([]);
  const [error, setError] = useState(null);

  const handleClick = async (event) => {

    // URL Format
    const domainPattern = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}$/;

    if (!inputDomain.trim()) {     // Check if empty
      alert("Please enter a domain name.");
      setDatas([]);
      return;
    }
    else if (!domainPattern.test(inputDomain))  // Check if valid domain
    {
      alert("Please enter a valid domain name (e.g., example.com)");
      setDatas([]);
      return;
    }

    // Selected value
    setValue(type);

    //Display data in table
    try {
      const response = await whoIPService.getDetails(inputDomain, type);
      setDatas([response.data]);
    } catch (err) {
      console.error("Error fetching data:", err);
      setDatas([]);
      setError("Network Error");
    }
  };

  return (
    <div className="App">
      <div className="max-w-1xl mx-auto p-6">
        {/* Input and Button */}
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter domain name"
            value={inputDomain}
            onChange={(e) => setInputDomain(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="domain">Domain Information</option>
            <option value="contact">Contact Information</option>
          </select>

          <button
            onClick={handleClick}
            className="px-6 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
          >
            Select
          </button>
        </div>

        {/* Table */}

        <div className="overflow-x-auto shadow rounded-xl">
          <table className="min-w-full bg-white">
            {value === "domain" ? (
              <>
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="py-3 px-4 w-1/5 font-medium">Domain Name</th>
                    <th className="py-3 px-4 w-1/5  font-medium">Registrar</th>
                    <th className="py-3 px-4 w-1/5 font-medium">
                      Registration Date
                    </th>
                    <th className="py-3 px-4 w-1/5 font-medium">
                      Expiration Date
                    </th>
                    <th className="py-3 px-4 w-1/5 font-medium">
                      Estimated Domain Age
                    </th>
                    <th className="py-3 px-4 w-1/5 font-medium">Hostnames</th>
                  </tr>
                </thead>
                <tbody>
                  {datas?.length > 0 ? (
                    datas.map((row) => (
                      <tr key={row.domain} className="border-t">
                        <td className="py-3 px-4">{row.domain}</td>
                        <td className="py-3 px-4">{row.registrar}</td>
                        <td className="py-3 px-4">{row.registrationDate}</td>
                        <td className="py-3 px-4">{row.expirationDate}</td>
                        <td className="py-3 px-4">{row.estimatedDomainAge}</td>
                        <td className="py-3 px-4">{row.hostnames}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center py-4 text-red-500">
                        {error ? error : "No data available."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </>
            ) : (
              <>
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="py-3 px-4 w-1/4 font-medium">
                      Registrant Name
                    </th>
                    <th className="py-3 px-4 w-1/4 font-medium">
                      Technical Contact Name
                    </th>
                    <th className="py-3 px-4 w-1/4 font-medium">
                      Administrative Contact Name
                    </th>
                    <th className="py-3 px-4 w-1/4 font-medium">
                      Contact Email
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {datas?.length > 0 ? (
                    datas.map((row) => (
                      <tr key={row.domain} className="border-t">
                        <td className="py-3 px-4">{row.registrantName}</td>
                        <td className="py-3 px-4">
                          {row.technicalContactName}
                        </td>
                        <td className="py-3 px-4">
                          {row.administrativeContactName}
                        </td>
                        <td className="py-3 px-4">{row.contactEmail}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center py-4 text-red-500">
                        {error ? error : "No data available."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </>
            )}
          </table>
        </div>
        {/* end table */}
      </div>
    </div>
  );
}

export default App;
