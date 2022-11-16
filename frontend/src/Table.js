import React from "react";

export default function Table({ city, temps }) {
  return (
    <div className="bg-[#f3f3f3]">
      {/* Setting table labels */}
      <div className="flex items-start max-w-[640px] mx-auto mt-14 columns-4 bg-white">
        <label className="py-[10px] w-[120px] px-4 font-bold font-poppinsFont text-sm text-[#4D4F5C]">City</label>
        <label className="py-[10px] w-[140px] px-4 font-bold font-poppinsFont text-sm text-[#4D4F5C]">Time</label>
        <label className="py-[10px] w-[140px] px-4 font-bold font-poppinsFont text-sm text-[#4D4F5C]">Temperature</label>
        <label className="py-[10px] w-[240px] px-4 font-bold font-poppinsFont text-sm text-[#4D4F5C]">SMS Action Payload</label>
      </div>
      {/* Create table row dinamically for each data we fetch */}
      <div className=" bg-white mx-auto max-w-[640px]">
        {temps.map((item, i) => (
          <>
            <hr />
            <div key={i} className="flex items-start max-w-[640px] mx-auto columns-4">
              <div className="py-[10px] w-[120px] px-4 font-poppinsFont text-xs">{city}</div>
              <div className="py-[10px] w-[140px] px-4 font-poppinsFont text-xs">{item.time.slice(0, 10) + ", " + item.time.slice(11, 16)}</div>
              <div className="py-[10px] w-[140px] px-4 font-poppinsFont text-xs">{Math.round(item.temp) + "°C"}</div>
              <div className="py-[10px] w-[240px] px-4 font-poppinsFont text-xs break-words">{item.smsPaylod}</div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
