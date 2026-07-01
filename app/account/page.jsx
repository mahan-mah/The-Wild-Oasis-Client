import { auth } from "../_lib/auth";

export const metadata = {
  title: "Guest Area",
};
async function Page() {
  const session = await auth();
  console.log("guesuus", session.user.guestId);
  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome, {session.user?.name}
    </h2>
  );
}

export default Page;
