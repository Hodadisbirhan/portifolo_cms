import { queryAdmin } from "@/gql/query";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { customeFetch } from "./customFetch";
import { secureAction } from "./secureAuthenticate";
export default defineEventHandler(async (event) => {
  const { normal } = secureAction({
    action_secret_key: event.req.headers.action_secret_key,
  });
  if (normal) {
    const body = await useBody(event);

    const { email, password: pass } = body.input.arg1;
    const accessToken = jwt.sign(
      {
        "https://hasura.io/jwt/claims": {
          "x-hasura-allowed-roles": ["owner"],
          "x-hasura-default-role": "owner",
        },
        email,
        role: "Admin",
      },
      process.env.ACCESS_GENERATE_KEY
    );

    try {
      const fetchUserByEmail = await customeFetch(queryAdmin, { email });

      if (
        fetchUserByEmail.data &&
        fetchUserByEmail.data.users[0] &&
        fetchUserByEmail.data.users[0].password
      ) {
        let hashedPass = fetchUserByEmail.data.users[0].password;

        let isEquals = bcrypt.compareSync(pass, hashedPass);

        if (isEquals) {
          return { message: "", status: 200, accessToken };
        } else
          return {
            message: "Incorrect email or password",
            status: 200,
            accessToken: null,
          };
      }
      return {
        message: "Incorrect email dhsjdhjhgdhs or password",
        status: 200,
        accessToken: null,
      };
    } catch (e) {
      return { message: "SomeError", status: 401, accessToken: null };
    }
  }
  return event.res.end();
});
