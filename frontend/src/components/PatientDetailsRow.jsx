import React from 'react';

const PatientDetailsRow = () => {
    const handleSeeMore = () => {
        alert('Viewing more details...');
    };

    // Example status - in a real application, this would be passed as a prop
    const status = "Admitted"; // Or "Discharged", or any other value
    const blueTextColor = "#34A8DD";
    const blueBgLightColor = "#E1F5FE"; // A light blue similar to Tailwind's blue-100

    return (
        <div className="flex items-center border-b py-3 px-4 hover:bg-gray-50 transition duration-150">
            <div className="w-1/5">Kavindu Perera</div>
            <div className="w-1/5">R1001</div>
            <div className="w-1/5">Male</div>
            <div className="w-1/5">
                <span
                    className={`${status === "Admitted"
                            ? `bg-[${blueBgLightColor}] text-[${blueTextColor}] border-[${blueTextColor}]`
                            : status === "Discharged"
                                ? `bg-[${blueBgLightColor}] text-[${blueTextColor}] border-[${blueTextColor}]`
                                : "bg-gray-100 text-gray-600 border-gray-400"
                        } text-sm px-3 py-1 rounded border`}
                >
                    {status}
                </span>
            </div>
            <div
                className="w-1/5 text-sky-500 cursor-pointer hover:underline text-right"
                onClick={handleSeeMore}
            >
                See more &gt;&gt;
            </div>
        </div>
    );
};

export default PatientDetailsRow;