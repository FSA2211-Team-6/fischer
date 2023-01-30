import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export const LogInButton = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <p>{session.user.name}</p>
        <a href="#" className="relative block">
          <Image
            loader={() => session.user.image}
            alt="profile"
            src={session.user.image}
            width={100}
            height={100}
            className="mx-auto object-cover rounded-full h-10 w-10 "
          />
        </a>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
};
