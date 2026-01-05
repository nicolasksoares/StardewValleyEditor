import React from "react";

interface ComplexFrameProps {
  children: React.ReactNode;
  className?: string;
}

export function ComplexGameFrame({ children, className }: ComplexFrameProps) {
  return (
    <div className={`bg-[#4B2A11] p-3 rounded-[15px] shadow-2xl ${className || ""}`}>
      <div className="bg-[#A54E00] pb-[3px] rounded-[15px]">
        <div className="bg-[#C56D1D] p-[4px] rounded-[15px]">
          <div className="bg-[#8A3C00] p-[7px] rounded-[15px]">
            <div className="bg-[#AF7D50] p-[5px] rounded-[15px] w-full h-full relative">
              <div className="overflow-hidden rounded-[10px] w-full h-full">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}