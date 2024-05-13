import React, { useState } from "react";

export default function Actions({ deposit, withdraw }) {
  
  const [state, setState] = useState("neutral");
  const [amount, setAmount] = useState(0);

  const onCancel = () => {
    setState("neutral");
    setAmount(0);
  };

  const onWithdraw = () => {
    withdraw(amount)
    setState('neutral')
    setAmount(0)
  };

  const onDeposit = () => {
    deposit(amount);
    setState('neutral')
    setAmount(0)
  };

  if (state === "neutral") {
    return (
      <div className="flex justify-center items-center gap-4 bg-neutral-900 py-16 rounded-b-lg">
        <button
          type="submit"
          className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2"
          onClick={() => {
            setState("deposit");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="M200-200v-560 560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v100h-80v-100H200v560h560v-100h80v100q0 33-23.5 56.5T760-120H200Zm320-160q-33 0-56.5-23.5T440-360v-240q0-33 23.5-56.5T520-680h280q33 0 56.5 23.5T880-600v240q0 33-23.5 56.5T800-280H520Zm280-80v-240H520v240h280Zm-160-60q25 0 42.5-17.5T700-480q0-25-17.5-42.5T640-540q-25 0-42.5 17.5T580-480q0 25 17.5 42.5T640-420Z" />
          </svg>
          Deposit
        </button>
        <button
          type="submit"
          className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2"
          onClick={() => {
            setState("withdraw");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="M441-120v-86q-53-12-91.5-46T293-348l74-30q15 48 44.5 73t77.5 25q41 0 69.5-18.5T587-356q0-35-22-55.5T463-458q-86-27-118-64.5T313-614q0-65 42-101t86-41v-84h80v84q50 8 82.5 36.5T651-650l-74 32q-12-32-34-48t-60-16q-44 0-67 19.5T393-614q0 33 30 52t104 40q69 20 104.5 63.5T667-358q0 71-42 108t-104 46v84h-80Z" />
          </svg>
          Withdraw
        </button>
      </div>
    );
  }
  if (state === "deposit") {
    return (
      <div className="bg-neutral-900 py-8 px-4 rounded-b-lg">
        <div>
          <InputAmount
            amount={amount}
            setAmount={setAmount}
            placeholder={"Enter amount to deposit."}
          />
        </div>
        <div className="flex justify-center mt-4">
          <button
            type="button"
            onClick={onCancel}
            class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onDeposit}
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Deposit
          </button>
        </div>
      </div>
    );
  }
  if (state === "withdraw") {
    return (
      <div className="bg-neutral-900 py-8 px-4 rounded-b-lg">
        <div>
          <InputAmount
            amount={amount}
            setAmount={setAmount}
            placeholder={"Enter amount to withdraw."}
          />
        </div>
        <div className="flex justify-center mt-4">
          <button
            type="button"
            onClick={onCancel}
            class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onWithdraw}
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Withdraw
          </button>
        </div>
      </div>
    );
  }
}

function InputAmount({ amount, setAmount, placeholder }) {
  return (
    <div>
      <label
        for="amount"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Enter Amount
      </label>
      <input
        onChange={(e) => setAmount(e.target.value)}
        value={amount}
        type="number"
        id="amount"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
