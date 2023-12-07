"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  getThirdPartyAuthorisationURLWithQueryParamsAndSetState,
  thirdPartySignInAndUp,
} from "supertokens-web-js/recipe/thirdpartypasswordless";

export default function AuthPage() {
  const path = usePathname();

  async function googleSignInClicked() {
    try {
      const authUrl =
        await getThirdPartyAuthorisationURLWithQueryParamsAndSetState({
          thirdPartyId: "google",

          // This is where Google should redirect the user back after login or error.
          // This URL goes on the Google's dashboard as well.
          frontendRedirectURI: "http:localhost:3000/auth/callback/google",
        });

      /*
        Example value of authUrl: https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&access_type=offline&include_granted_scopes=true&response_type=code&client_id=1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com&state=5a489996a28cafc83ddff&redirect_uri=https%3A%2F%2Fsupertokens.io%2Fdev%2Foauth%2Fredirect-to-app&flowName=GeneralOAuthFlow
        */

      // we redirect the user to google for auth.
      window.location.assign(authUrl);
    } catch (err: any) {
      console.log("googleSignInClicked", err);
      if (err.isSuperTokensGeneralError === true) {
        // this may be a custom error message sent from the API by you.
        window.alert(err.message);
      } else {
        window.alert("Oops! Something went wrong.");
      }
    }
  }

  async function handleGoogleCallback() {
    try {
      const response = await thirdPartySignInAndUp();
      console.log({ response });

      if (response.status === "OK") {
        console.log(response.user);
        if (
          response.createdNewRecipeUser &&
          response.user.loginMethods.length === 1
        ) {
          // sign up successful
        } else {
          // sign in successful
        }
        window.location.assign("/");
      } else if (response.status === "SIGN_IN_UP_NOT_ALLOWED") {
        // this can happen due to automatic account linking. Please see our account linking docs
      } else {
        // SuperTokens requires that the third party provider
        // gives an email for the user. If that's not the case, sign up / in
        // will fail.

        // As a hack to solve this, you can override the backend functions to create a fake email for the user.

        window.alert(
          "No email provided by social login. Please use another form of login"
        );
        window.location.assign("/auth"); // redirect back to login page
      }
    } catch (err: any) {
      console.log({ err });

      if (err.isSuperTokensGeneralError === true) {
        // this may be a custom error message sent from the API by you.
        window.alert(err.message);
      } else {
        window.alert("Oops! Something went wrong.");
      }
    }
  }

  useEffect(() => {
    if (path === "/auth/callback/google") handleGoogleCallback();
  }, [path]);

  if (path === "/auth/callback/google") return null;

  return <button onClick={googleSignInClicked}>pdage</button>;
}
