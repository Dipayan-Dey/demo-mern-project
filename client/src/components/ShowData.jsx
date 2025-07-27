import React from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Swal from 'sweetalert2/dist/sweetalert2.js'

function ShowData({ data, getData, setFormData }) {
  
  const deleteEntries = (deleteId) => {
    const swalWithTailwind = Swal.mixin({
      customClass: {
        confirmButton:
          "bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded m-5",
        cancelButton:
          "bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded m-5",
      },
      buttonsStyling: false,
    });

    swalWithTailwind
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          // Your axios delete logic here...

          axios
            .delete(`http://localhost:1711/api/user/routes/delete/${deleteId}`)
            .then((res) => {
              // alert(deleteId)
              //  toast.success("Data Delete Successfully..")
              getData();
            });
          swalWithTailwind.fire(
            "Deleted!",
            "Your data has been deleted.",
            "success"
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithTailwind.fire("Cancelled", "Your data is safe :)", "error");
        }
      });
  };

  const editdata = (editid) => {
    axios
      .get(`http://localhost:1711/api/user/routes/edit/${editid}`)
      .then((res) => {
        let data = res.data;
        setFormData(data.updatedData);
      });
    // alert(editid)
  };

  return (
    <div>
      <div className="p-4 sm:p-8 overflow-auto">
        <ToastContainer />
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
          Submitted Data
        </h2>

        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700 bg-white">
            <thead className="bg-gray-100 text-gray-600 font-semibold">
              <tr>
                <th className="px-4 py-2 text-left">Id</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2 text-left">Message</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {data.length >= 1 ? (
                data.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{item.username}</td>
                    <td className="px-4 py-2">{item.email}</td>
                    <td className="px-4 py-2">{item.phoneNumber}</td>
                    <td className="px-4 py-2">{item.message}</td>
                    <td className="px-4 py-2">
                      <div className="flex flex-wrap gap-2  ">
                        <button
                          onClick={() => editdata(item._id)}
                          type="button"
                          className="text-white bg-blue-600 hover:bg-blue-700  font-medium rounded-lg text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 transition focus:outline-none cursor-pointer"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => deleteEntries(item._id)}
                          type="button"
                          className="text-white bg-red-600 hover:bg-red-700 cursor-pointer font-medium rounded-lg text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 transition focus:outline-none"
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                // <p>Data Not Found</p>
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-6 text-gray-500 font-semibold"
                  >
                    Data Not Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ShowData;
