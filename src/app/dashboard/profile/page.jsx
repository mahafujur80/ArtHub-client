import UpdatePasswordModal from "@/Components/Dashboard/Porfile/PasswordChangeModal";
import { UpdateProfileModal } from "@/Components/Dashboard/Porfile/UpdatePorfileModal";
import { getServerSession } from "@/lib/server/getServerSession";
import Image from "next/image";
import { FiEdit, FiLock, FiMail, FiCalendar, FiShield,FiCheckCircle, FiXCircle } from "react-icons/fi";

export default async function ProfileCard() {
  const user  = await getServerSession()


  // Conditional role badge
  const getRoleLabel = () => {
    return user?.role === "artist" 
      ? "Artist" 
      : user?.role === 'admin' 
      ? "Admin" 
      : user?.role === 'buyer' 
      ? "Buyer" 
      : "User";
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-3 sm:p-4 md:p-6">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl">
        <div className="relative bg-white rounded-[1.5rem] sm:rounded-[2rem] shadow-xl sm:shadow-2xl shadow-orange-500/10 overflow-hidden">
          
          {/* Cover */}
          <div className="relative h-28 sm:h-32 md:h-36 lg:h-40 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-8 sm:top-6 sm:right-12 md:top-8 md:right-16 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-2 border-white rounded-full" />
              <div className="absolute bottom-4 left-6 sm:bottom-5 sm:left-10 md:bottom-6 md:left-12 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 border-2 border-white rounded-full" />
              <div className="absolute top-8 left-1/3 sm:top-10 md:top-12 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-2 border-white rounded-full" />
            </div>
          </div>

          {/* Content */}
          <div className="relative px-4 sm:px-6 md:px-8 lg:px-12 pb-5 sm:pb-6 md:pb-8">
            
            {/* Avatar Section */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-3 sm:gap-4 md:gap-5 -mt-12 sm:-mt-14 md:-mt-16 mb-4 sm:mb-5 md:mb-8">
              <div className="relative flex-shrink-0">
                <div className="absolute -inset-1 sm:-inset-1.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full blur-md opacity-40" />
                <Image
                  width={200}
                  height={200}
                  src={user.image}
                  alt={user.name}
                  className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-3 sm:border-4 border-white object-cover shadow-lg sm:shadow-xl bg-gray-100"
                />
                <div className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 bg-green-400 rounded-full border-2 border-white animate-pulse" />
              </div>
              
              <div className="text-center sm:text-left flex-1 pt-2 sm:pt-0">
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center sm:justify-start">
                  <h2 className="text-lg sm:text-xl md:text-2xl  font-bold text-gray-900">{user.name}</h2>
                
                </div>
                <p className="text-gray-500 text-xs sm:text-sm mt-0.5 sm:mt-1 flex items-center justify-center sm:justify-start gap-1 sm:gap-1.5">
                  <FiMail className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                  <span className="truncate">{user.email}</span>
                  {user.emailVerified ? (
                    <FiCheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-500 flex-shrink-0" />
                  ) : (
                    <FiXCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-400 flex-shrink-0" />
                  )}
                </p>
              </div>
            </div>

            {/* Conditional Panel */}
            <div className="mb-4 sm:mb-5 md:mb-8 p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100">
              <p className="text-sm sm:text-base text-gray-700 font-medium">
                {user?.role === "artist" 
                  ? "Manage your artworks, upload new creations and track sales" 
                  : user?.role === 'admin' 
                  ? "Manage all users, oversee platform activities and maintain quality" 
                  : user?.role === 'buyer' 
                  ? "Browse artworks, manage purchases and follow artists" 
                  : "Welcome to your dashboard"
                }
              </p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-5 md:mb-8">
              
              {/* Card 1 - Account Type */}
              <div className="p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100/50 border border-orange-100 hover:border-orange-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="p-1.5 sm:p-2 rounded-lg bg-orange-500/10 flex-shrink-0">
                    <FiShield className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                  </div>
                  <p className="text-xs  text-gray-500 font-medium">Account Type</p>
                </div>
                <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900">{getRoleLabel()}</p>
              </div>

              {/* Card 2 - Member Since */}
              <div className="p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-100 hover:border-amber-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="p-1.5 sm:p-2 rounded-lg bg-amber-500/10 flex-shrink-0">
                    <FiCalendar className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
                  </div>
                  <p className="text-xs  text-gray-500 font-medium">Member Since</p>
                </div>
                <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900">{new Date(user?.createdAt).toLocaleDateString()}</p>
              </div>

              {/* Card 3 - Plan */}
              <div className="p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 hover:border-green-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="p-1.5 sm:p-2 rounded-lg bg-green-500/10 flex-shrink-0">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-500 rounded-full animate-pulse" />
                    </div>
                  </div>
                  <p className="text-xs  text-gray-500 font-medium">Plan</p>
                </div>
                <p className="text-sm sm:text-base md:text-lg font-bold text-green-600 capitalize">{user.plan}</p>
              </div>

            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <UpdateProfileModal  user={user}/>

              <UpdatePasswordModal/>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}