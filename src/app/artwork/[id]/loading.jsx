"use client";

import { ThreeCircles } from "react-loader-spinner";

const Loading = () => {
    return (
        <div className="flex items-center justify-center min-h-[95vh]">
            <ThreeCircles
                visible={true}
                height="80"
                width="80"
                color="#f97316" 
                ariaLabel="three-circles-loading"
            />
        </div>
    );
};

export default Loading;