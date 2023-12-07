import ThirdPartyPasswordless from "supertokens-web-js/recipe/thirdpartypasswordless";
import SessionWebJs from "supertokens-web-js/recipe/session";
import { appInfo } from "./appInfo";
import { SuperTokensConfig } from "supertokens-web-js/types";
import multitenancy from "supertokens-web-js/recipe/multitenancy";

export const frontendConfig = (): SuperTokensConfig => {
  return {
    appInfo,
    recipeList: [
      ThirdPartyPasswordless.init(),
      multitenancy.init(),
      SessionWebJs.init(),
    ],
  };
};
