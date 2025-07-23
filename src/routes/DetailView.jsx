import React from "react";
import { useParams } from "react-router-dom";
import AstroDashDetails from "../components/AstroDashDetails";

const DetailView = () => {
  const { postalCode, date } = useParams();

  return (
    <div>
      {postalCode && date ? (
        <AstroDashDetails />
      ) : (
        <p className="text-center text-red-500">
          Missing postal code or date in URL
        </p>
      )}
    </div>
  );
};

export default DetailView;
