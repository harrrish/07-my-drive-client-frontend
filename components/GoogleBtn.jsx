import { useNavigate } from "react-router-dom";
import { loginWithGoogle } from "../apis/loginWithGoogle";
import { GoogleLogin } from "@react-oauth/google";
import { UserSettingViewContext } from "../utils/Contexts";
import { useContext } from "react";

export default function CompGoogleBtn() {
  const navigate = useNavigate();
  const { setOpenSettings } = useContext(UserSettingViewContext);

  return (
    <GoogleLogin
      type="standard"
      shape="circle"
      text="Continue with"
      theme="filled_blue"
      onSuccess={async (credentialResponse) => {
        // console.log(credentialResponse);
        const res = await loginWithGoogle(credentialResponse.credential);
        if (res === 200 || res === 201) {
          navigate("/directory");
          setOpenSettings(false);
        }
      }}
      onError={() => {
        console.log("Login Failed");
      }}
      useOneTap
    />
  );
}
