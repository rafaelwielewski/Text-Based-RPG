import { useRouter } from "next/router";
import authService from "@/services/auth.service";
import { useEffect } from "react";


export default function Home() {

  const router = useRouter();

  useEffect(() => {
    console.log(localStorage.getItem('user'));
    
    const authUser = localStorage.getItem('user');
    
    console.log(authUser);

    // if there is no authenticated user, redirect to login page_

    if (!authUser) {
      console.log('dssdf');
      router.push("/auth/login");
    }
  }, []);

  function decodeJwt(token) {
    var base64Payload = token.split(".")[1];
    var payloadBuffer = Buffer.from(base64Payload, "base64");
    return JSON.parse(payloadBuffer.toString());
  }

  const handleSubmit = async (event) => {

    const user = JSON.parse(localStorage.getItem('user'));
    const decodedJwt = decodeJwt(user.accessToken);
    console.log(decodedJwt.username);
    console.log(user.username);
    authService.logout();

  }
    return (
      <>
        <main className="">
          <button type="button" onClick={handleSubmit}>asdsdfsdfsdf</button>
        </main>
      </>
    )
  }