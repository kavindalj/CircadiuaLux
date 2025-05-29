import React from 'react';
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import UserDetailsRow from './UserDetailsRow';
import { supabase } from "../supabaseClient";
import UsersListPagination from './UsersListPagination';

const AllUsersTable = () => {

    const navigate = useNavigate();

    const [fetchError, setFetchError] = useState(null)
    const [usersData, setusersData] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [UsersPerPage] = useState(7)

    //To format the show_id as USRXXXX
    const formatUserId = (id) => {
        if (!id && id !== 0) return '';
        return `USR${String(id).padStart(3, '0')}`;
    };

    //Fetch users details
    useEffect(() => {
        const fetchUsersData = async () => {
            const { data,error } = await supabase
                .from("user_profiles")
                .select("show_id, role, full_name, email, phone")
                .order("show_id", { ascending: true });
    
                if(error){
                    setFetchError("Could not fetch patient data");
                    setusersData(null);
                    console.log("Error fetching: " , error);
                }
                if (data) {
                    console.log("Fetched patients:", data);
                    setusersData (data);
                    setFetchError(null);
                }
        }
        fetchUsersData();
    }, []);

    //Pagination part
    const lastUserIndex = currentPage * UsersPerPage
    const firstUserIndex = lastUserIndex - UsersPerPage
    const currentUsers = usersData.slice(firstUserIndex, lastUserIndex)

    return (
        <div className="bg-white pt-8 pr-8 pb-8 pl-8 rounded-lg shadow-lg w-[1000px] text-left">

            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-left text-xl font-bold mb-2">All Users</h2>
                <button 
                    className="bg-sky-500 shadow-md px-6 cursor-pointer rounded-md text-white font-bold px-6 py-1 bg-gradient-to-r from-[#36AFDE] to-[#74DAF6] text-white  hover:brightness-90"
                    onClick={() => navigate('/dashboardAdmin/addUser')}
                >
                    Add User
                </button>
            </div>

            {/* Table Headers */}
            <div className="flex text-sm font-semibold text-gray-400 border-b pb-3">
                <div className="w-[12%] pl-5">User ID</div>
                <div className="w-[18%] pl-8">User Type</div>
                <div className="w-[20%] pl-13">Name</div>
                <div className="w-[30%] pl-18">Email</div>
                <div className="w-[0%] pl-13">Mobile</div>
            </div>

            {fetchError && (<p>{fetchError}</p>)}
            {usersData && (
                <div className="min-h-[430px] flex flex-col justify-between">
                    <div>
                        {currentUsers.map(userData => (
                            <UserDetailsRow key={userData.show_id} userData={{...userData, show_id: formatUserId(userData.show_id)}} />
                        ))}
                    </div>

                    <UsersListPagination
                        totalUsers={usersData.length} 
                        UsersPerPage={UsersPerPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    />
                </div>
            )}   

        </div>
    );
};

export default AllUsersTable;
