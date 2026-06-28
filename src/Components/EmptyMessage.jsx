import { FaBoxOpen } from "react-icons/fa";

const EmptyMessage = ({
  title = "Nothing Found",
  description = "We couldn't find any data to display right now.",
}) => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg rounded-3xl border border-orange-100 bg-white p-8 text-center shadow-lg sm:p-10">
        {/* Icon */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-orange-100">
          <FaBoxOpen className="text-5xl text-orange-500" />
        </div>

        {/* Title */}
        <h2 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl">
          {title}
        </h2>

        {/* Description */}
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-gray-500 sm:text-base">
          {description}
        </p>

        {/* Decorative Line */}
        <div className="mx-auto mt-8 h-1 w-24 rounded-full bg-orange-500"></div>
      </div>
    </div>
  );
};

export default EmptyMessage;