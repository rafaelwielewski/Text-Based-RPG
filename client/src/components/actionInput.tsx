import authService from "@/lib/services/auth/auth.service";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

export default function ActionInput({ action }) {
  const router = useRouter();
  const [actionInput, setActionInput] = useState("");

  const handleChange = (e) => {
    e.preventDefault();

    setActionInput(e.currentTarget.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      action(actionInput);

      setActionInput("");

    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    action(actionInput);

    setActionInput("");

  };
  
  return (
    <>
      <form className="flex">
        <input
          className="w-full py-1 focus:border-none focus:outline-0"
          name="actionInput"
          id="actionInput"
          value={actionInput}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        ></input>
        <button
          className="bg-orange-500 text-white px-4"
          type="button"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </>
  );
}
