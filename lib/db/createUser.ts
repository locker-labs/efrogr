import { ICreateEfrogrUserProps } from "@/app/api/createUser/route";
import { TABLES } from "../constants";
import { IEfrogrTgJson, IEfrogrUser } from "../types";
import verifyJwt from "../verifyJwt";
import supabaseServer from "@/lib/supabase/supabaseServer";

const DEFAULT_CREDITS = -1;

export default async function createEfrogrUser({
  dynamicUserId,
  address,
  telegramAuthToken,
}: ICreateEfrogrUserProps): Promise<IEfrogrUser> {
  console.log("createEfrogrUser", dynamicUserId, address, telegramAuthToken);

  // verify tg info is signed by our bot
  const tgJson = verifyJwt(
    telegramAuthToken,
    process.env.BOT_TOKEN!
  ) as IEfrogrTgJson;
  console.log("tgJson", tgJson);

  const newUser: IEfrogrUser = {
    dynamicUserId,
    address,
    tgJson,
    croakLeft: DEFAULT_CREDITS.toString(),
  };

  console.log("newUser", newUser);

  const { data, error } = await supabaseServer
    .from(TABLES.EFROGR_USERS)
    .upsert(newUser, { onConflict: "dynamicUserId", ignoreDuplicates: true })
    .select();

  console.log("data", data);
  console.log(error);

  if (!data) throw new Error("Failed to create user", error);

  const efrogrUser = data[0] as IEfrogrUser;

  return efrogrUser;
}
