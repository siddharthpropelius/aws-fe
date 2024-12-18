import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const fetchData = async () => {
    const data = await axios.get("https://test.codesiddharth.tech/api/users");
    setData(data?.data ?? []);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleOnAdd = async () => {
    await axios.post("https://test.codesiddharth.tech/api/users", input);
    setInput({
      firstName: "",
      lastName: "",
      email: "",
    });
    fetchData();
  };
  return (
    <div className="mx-6 my-4">
      <input
        required
        type="text"
        placeholder="First Name"
        name="firstName"
        onChange={handleChange}
        value={input.firstName}
      />
      <input
        required
        type="text"
        placeholder="Last Name"
        name="lastName"
        onChange={handleChange}
        value={input.lastName}
      />
      <input
        required
        type="email"
        placeholder="email"
        name="email"
        onChange={handleChange}
        value={input.email}
      />
      <buton onClick={handleOnAdd}>add</buton>
      <div className="relative mt-12 overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                First Name
              </th>
              <th scope="col" className="px-6 py-3">
                Last Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from(data).map((i) => {
              return (
                <tr
                  key={i.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {i.first_name}
                  </th>
                  <td className="px-6 py-4">{i.last_name}</td>
                  <td className="px-6 py-4">{i.email}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
