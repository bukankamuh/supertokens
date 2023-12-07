import { getSSRSession } from "./sessionUtils";

export default async function Home() {
  const { session, hasToken, hasInvalidClaims } = await getSSRSession();
  console.log(hasToken, hasInvalidClaims, session);

  return <main></main>;
}
