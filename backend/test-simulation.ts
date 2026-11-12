import "dotenv/config";

const baseUrl = "http://localhost:3000";

async function simulate() {
  console.log("\n========== SIMULATION START ==========\n");

  // 1. Sign-up
  console.log("--- 1. Sign-up ---");
  const signUpRes = await fetch(`${baseUrl}/api/auth/sign-up/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Origin": baseUrl },
    body: JSON.stringify({
      name: "TestUser",
      email: `test${Date.now()}@example.com`,
      password: "testpassword123",
    }),
  });
  console.log("Sign-up status:", signUpRes.status);
  const signUpBody = await signUpRes.json();
  console.log("Sign-up response:", JSON.stringify(signUpBody, null, 2).substring(0, 500));

  // Get cookie from sign-up
  const cookies = signUpRes.headers.getSetCookie();
  const sessionCookie = cookies.find((c: string) => c.startsWith("better-auth.session_token="));
  console.log("Session cookie received:", !!sessionCookie);

  if (!sessionCookie) {
    console.error("No session cookie, cannot continue");
    process.exit(1);
  }

  const cookieVal = sessionCookie.split(";")[0];

  // 2. Sign-in
  console.log("\n--- 2. Sign-in ---");
  const signInRes = await fetch(`${baseUrl}/api/auth/sign-in/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Origin": baseUrl },
    body: JSON.stringify({
      email: signUpBody.user?.email || signUpBody.email,
      password: "testpassword123",
    }),
  });
  console.log("Sign-in status:", signInRes.status);
  const signInBody = await signInRes.json();
  console.log("Sign-in OK:", signInBody.user?.name || "N/A");

  const signInCookies = signInRes.headers.getSetCookie();
  const signInSessionCookie = signInCookies.find((c: string) => c.startsWith("better-auth.session_token="));
  const activeCookie = signInSessionCookie ? signInSessionCookie.split(";")[0] : cookieVal;

  // 3. Create financial account
  console.log("\n--- 3. Create Account ---");
  const createAccRes = await fetch(`${baseUrl}/api/account`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cookie": activeCookie,
    },
    body: JSON.stringify({
      name: "Test Savings",
      type: "BANK",
      balance: "5000.50",
    }),
  });
  console.log("Create Account status:", createAccRes.status);
  const createAccBody = await createAccRes.json();
  console.log("Create Account response:", JSON.stringify(createAccBody, null, 2).substring(0, 500));

  // 4. List accounts
  console.log("\n--- 4. List Accounts ---");
  const listRes = await fetch(`${baseUrl}/api/account`, {
    method: "GET",
    headers: { "Cookie": activeCookie },
  });
  console.log("List Accounts status:", listRes.status);
  const listBody = await listRes.json();
  console.log("List Accounts count:", listBody.data?.length || 0);

  // 5. Unauthenticated request (should 401)
  console.log("\n--- 5. Unauthenticated Request ---");
  const unauthRes = await fetch(`${baseUrl}/api/account`, {
    method: "GET",
  });
  console.log("Unauthenticated status:", unauthRes.status, "(expected 401)");

  // 6. Create category
  console.log("\n--- 6. Create Category ---");
  const createCatRes = await fetch(`${baseUrl}/api/category/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cookie": activeCookie,
    },
    body: JSON.stringify({
      categoryName: `TestCategory${Date.now()}`,
    }),
  });
  console.log("Create Category status:", createCatRes.status);
  const createCatBody = await createCatRes.json();
  console.log("Create Category response:", JSON.stringify(createCatBody, null, 2).substring(0, 300));

  // 7. List categories
  console.log("\n--- 7. List Categories ---");
  const listCatRes = await fetch(`${baseUrl}/api/category/all`, {
    method: "GET",
    headers: { "Cookie": activeCookie },
  });
  console.log("List Categories status:", listCatRes.status);
  const listCatBody = await listCatRes.json();
  console.log("List Categories count:", listCatBody.data?.length || 0);

  // 8. Verify user has no 'image' key
  console.log("\n--- 8. Verify User Schema ---");
  const userKeys = Object.keys(signUpBody.user || signUpBody || {});
  console.log("User keys:", userKeys);
  console.log("Has 'image' key:", userKeys.includes("image"));

  console.log("\n========== SIMULATION COMPLETE ==========\n");
}

simulate().catch((e) => {
  console.error("Simulation error:", e);
  process.exit(1);
});
