import React from "react";
import { useNavigate } from "react-router-dom";

export default function Upgraded() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Payment complete</h1>
      <button onClick={() => navigate("/directory", { replace: true })}>
        Back to home
      </button>
    </div>
  );
}
