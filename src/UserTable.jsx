import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NumberFlow from "@number-flow/react";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  var i=0;
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/getUsers?page=${currentPage}`)
      .then((response) => {
        setUsers(response.data.data);
        setTotalPages(response.data.last_page);
      });
  }, [currentPage]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/getUsersCount").then((response) => {
      setCount(response.data);
    });
  }, []);

  return (
    <>
      <section className="container px-4 mx-auto">
        <div className="flex items-center justify-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">
            Users Table
          </h2>
          {count >= 1 ? (
            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
              <NumberFlow value={count} />
            </span>
          ) : (
            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
              <NumberFlow value="0" />
            </span>
          )}
        </div>

        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <div className="flex items-center gap-x-3">
                          <span>Sno</span>
                        </div>
                      </th>

                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <div className="flex items-center gap-x-3">
                          <span>Name</span>
                        </div>
                      </th>

                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <button className="flex items-center gap-x-2">
                          <span>Email</span>
                        </button>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <button className="flex items-center gap-x-2">
                          <span>Password</span>
                        </button>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <button className="flex items-center gap-x-2">
                          <span>Status</span>
                        </button>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <button className="flex items-center gap-x-2">
                          <span>Edit</span>
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {users.map((user,index) => (
                      <tr key={user.id}>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          <div className="inline-flex items-center gap-x-3">
                            <div className="flex items-center gap-x-2">
                              <div>
                                <h2 className="font-medium text-gray-800 dark:text-white ">
                                  {(currentPage - 1) * 5 + index + 1}
                                </h2>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          <div className="inline-flex items-center gap-x-3">
                            <div className="flex items-center gap-x-2">
                              <div>
                                <h2 className="font-medium text-gray-800 dark:text-white ">
                                  {user.name}
                                </h2>
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {user.email}
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {user.password}
                        </td>
                        {user.status == 1 ? (
                          <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>

                              <h2 className="text-sm font-normal text-emerald-500">
                                Active
                              </h2>
                            </div>
                          </td>
                        ) : (
                          <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-red-100/60 dark:bg-gray-800">
                              <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>

                              <h2 className="text-sm font-normal text-red-500">
                                Not Active
                              </h2>
                            </div>
                          </td>
                        )}

                        <td className="px-4 py-4">
                          <Link
                            to={`create-user/${user.id}`}
                            className="text-white bg-red-500 rounded-md px-5 py-1"
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="float-right mt-5">
                {currentPage > 1 && (
                  <button
                    className="px-4 py-1 bg-gray-200 font-semibold border m-1"
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Prev
                  </button>
                )}
                {currentPage < totalPages && (
                  <button
                    className="px-4 py-1 bg-gray-200 text-gray-800 font-semibold border m-1"
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserTable;
