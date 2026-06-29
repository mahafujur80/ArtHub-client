import Link from 'next/link';
import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const LoginBtnForForm = ({id}) => {
    return (
        <Link href={`/login?redirect=/artwork/${id}`}>
            <div className="w-full bg-white text-orange-600 hover:bg-orange-50 font-bold  rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl flex items-center justify-center gap-3 group cursor-pointer">


                        <button type="submit" className="w-full flex items-center justify-center gap-5 p-3">
                            Login for purchase
                            <FaShoppingCart className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                        </button>

            </div>
        </Link>
    );
};

export default LoginBtnForForm;