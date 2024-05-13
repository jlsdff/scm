import React from "react";

export default function Profile({ address, balance }) {
  return (
    <section className="flex flex-col justify-end h-48 p-4">
      <div>
        <h1 className="">
          <span className="text-lg font-bold text-neutral-800/80">Balance:</span>
          <br />
          <span className="text-4xl font-black text-neutral-900 ">{balance}</span>
        </h1>
      </div>
      <h2 className="text-sm font-semibold text-neutral-800/80 truncate">{address}</h2>
    </section>
  );
}
