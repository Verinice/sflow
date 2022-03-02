import React from "react";
import Image from "next/image";
function Adornment() {
  return (
    <div className="adornment">
      <Image src="/emu.png" width={24} height={24} alt="emu" />
    </div>
  );
}

export default Adornment;
