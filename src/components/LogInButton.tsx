import { useSession, signIn, signOut } from "next-auth/react";

export const LogInButton = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <p>{session.user.name}</p>
        <a href="#" className="relative block">
          <img
            alt="profil"
            src={session.user.image}
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
