import React from 'react';

const Footer = () => {
    return (
        <div className="bg-gray-100">
            <div className="max-w-screen-lg py-10 px-4 sm:px-6 text-gray-800 sm:flex justify-between mx-auto">
                <div className="p-5 sm:w-2/12 border-r">
                    <div className="text-sm uppercase text-blue-600 font-bold">Menu</div>
                    <ul>
                        <li className="my-2">
                            <a className="hover:text-blue-600" href="#">Home</a>
                        </li>
                        <li className="my-2">
                            <a className="hover:text-blue-600" href="#">Services</a>
                        </li>
                        <li className="my-2">
                            <a className="hover:text-blue-600" href="#">Products</a>
                        </li>
                        <li className="my-2">
                            <a className="hover:text-blue-600" href="#">Pricing</a>
                        </li>
                    </ul>
                </div>
                <div className="p-5 sm:w-7/12 border-r text-center">
    <h3 className="font-bold text-xl text-blue-600 mb-4">Streets Eats</h3>
    <p className="text-gray-500 text-sm mb-10">Streets Eats is a web app for the food truck industry, featuring an interactive map to find nearby trucks and a blog covering tips, interviews, and reviews.</p>
</div>

                <div className="p-5 sm:w-3/12">
                    <div className="text-sm uppercase text-blue-600 font-bold">Contact Us</div>
                    <ul>
                        <li className="my-2">
                            <a className="hover:text-blue-600" href="#">XXX XXXX, Dallas, TX</a>
                        </li>
                        <li className="my-2">
                            <a className="hover:text-blue-600" href="#">streets_eats@company.com</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex py-5 m-auto text-gray-800 text-sm flex-col items-center border-t max-w-screen-xl">
                <div className="md:flex-auto md:flex-row-reverse mt-2 flex-row flex">
                    <a href="#" className="w-6 mx-1">
                        {/* Add Twitter SVG here */}
                    </a>
                    <a href="#" className="w-6 mx-1">
                        {/* Add Facebook SVG here */}
                    </a>
                    <a href="#" className="w-6 mx-1">
                        {/* Add Instagram SVG here */}
                    </a>
                    <a href="#" className="w-6 mx-1">
                        {/* Add LinkedIn SVG here */}
                    </a>
                </div>
                <div className="my-5">© Copyright 2024. All Rights Reserved.</div>
            </div>
        </div>
    );
};

export default Footer;

