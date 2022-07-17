import * as fcl from "@onflow/fcl";
import { signOut } from "next-auth/react";

export async function signOutUser() {
  fcl.unauthenticate();
  await signOut({ redirect: false });
}
