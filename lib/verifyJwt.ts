import jwt from "jsonwebtoken";

export default function verifyJwt(maybeJwt: string, secretToken: string) {
  const decodedAuthToken = jwt?.verify(maybeJwt, secretToken, {
    algorithms: ["HS256"],
  });
  return decodedAuthToken;
}
