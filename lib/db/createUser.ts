import { ICreateEfrogrUserProps } from "@/app/api/createUser/route";
import { TABLES } from "../constants";
import { IEfrogrTgJson, IEfrogrUser } from "../types";
import verifyJwt from "../verifyJwt";
import supabaseServer from "@/lib/supabase/supabaseServer";

const DEFAULT_CREDITS = 0;

export default async function createEfrogrUser({
  dynamicUserId,
  address,
  telegramAuthToken,
}: ICreateEfrogrUserProps): Promise<IEfrogrUser> {
  console.log("createEfrogrUser", dynamicUserId, address, telegramAuthToken);

  // verify tg info is signed by our bot
  const tgJson = telegramAuthToken
    ? (verifyJwt(telegramAuthToken, process.env.BOT_TOKEN!) as IEfrogrTgJson)
    : {
        authDate: 0,
        firstName: "",
        lastName: "",
        username: address,
        id: 0,
        photoURL: "",
        hash: "",
        iat: 0,
      };
  console.log("tgJson", tgJson);

  // return existing user if exists
  const { data: users, error: usersError } = await supabaseServer
    .from(TABLES.EFROGR_USERS)
    .select("*")
    .eq("dynamicUserId", dynamicUserId);

  console.log("Existing user", users, usersError);
  if (!usersError && users && users.length > 0) {
    return users[0] as IEfrogrUser;
  }

  // otherwise create new users
  const newUser: IEfrogrUser = {
    dynamicUserId,
    address,
    tgJson,
    croakLeft: DEFAULT_CREDITS.toString(),
    // TODO: generate savingsAddress using dynamic and MAv2Client
    savingsAddress: undefined,
  };

  console.log("newUser", newUser);

  const { data, error } = await supabaseServer
    .from(TABLES.EFROGR_USERS)
    .insert(newUser)
    .select();

  console.log("data", data);
  console.log(error);

  if (!data) throw new Error("Failed to create user", error);

  const efrogrUser = data[0] as IEfrogrUser;

  return efrogrUser;
}
