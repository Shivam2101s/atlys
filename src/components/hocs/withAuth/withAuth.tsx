import * as React from "react";
import { AuthPopup } from "../../popups/AuthPopup";
import { useNavigate } from "react-router-dom";

export function withAuth(WrappedComponent: any) {
  return (props: React.PropsWithChildren) => {
    const isAuthenticated = localStorage.getItem("userState");
    const navigate = useNavigate();

    if (!isAuthenticated) {
      return (
        <>
          <WrappedComponent {...props} />
          <AuthPopup show onClose={() => navigate("/auth")} />
        </>
      );
    }

    return <WrappedComponent {...props} />;
  };
}
