import { Client, Keypair, PublicKey } from "@synonymdev/pubky";

//================================================================
// STEP 1: INITIALIZATION
// We'll start by setting up our client and creating a new
// identity, which is represented by a cryptographic keypair.
//================================================================
console.log("STEP 1: INITIALIZATION & KEY GENERATION");

// Initialize the Pubky Client to connect to the Pkarr relay network.
// We're using the testnet for this demo.
const client = Client.testnet();
console.log("✔️ Pubky client initialized for testnet.");

// Generate a new, random keypair. This is our user's identity.
// The keypair consists of a private key (secret) and a public key (sharable).
const keypair = Keypair.random();
const publicKey = keypair.publicKey();
console.log("✔️ New cryptographic keypair generated.");
console.log("👤 Public Key (z32):", publicKey.z32());


//================================================================
// STEP 2: ACCOUNT SIGNUP & SESSION VERIFICATION
// A user needs to associate their keypair with a homeserver,
// which will store their encrypted data. This is a one-time setup.
//================================================================
console.log("\nSTEP 2: ACCOUNT SIGNUP & SESSION VERIFICATION");

const testnet_homeserver = "8pinxxgqs41n4aididenw5apqp1urfmzdztr8jt4abrkdn435ewo";
const homeserver_pk = PublicKey.from(testnet_homeserver);
console.log("🏠 Using homeserver:", testnet_homeserver.slice(0, 20) + "...");


console.log("⏳ Attempting to sign up new account on the homeserver...");
await client.signup(keypair, homeserver_pk);
console.log("✅ Signup successful!");


const session = await client.session(publicKey);
console.log(session ? "✅ Session verified. User is signed in." : "❌ Session verification failed.");


//================================================================
// STEP 3: WRITING DATA (PUT)
// Now we'll write a piece of public data to a specific URL within our own homeserver
//================================================================
console.log("\nSTEP 3: WRITING DATA (AUTHENTICATED PUT)");

const url = `pubky://${publicKey.z32()}/pub/example.com/demo.json`;
console.log("🔗 Target URL for our data:", url);

// Use client.fetch, which works like the standard Fetch API.
const putResponse = await client.fetch(url, {
        method: "PUT",
        body: JSON.stringify({ foo: "bar" }),
        credentials: "include",
    });
console.log(putResponse.ok ? "✅ PUT successful. Data is now stored." : "❌ PUT failed.");


//================================================================
// STEP 4: READING PUBLIC DATA (GET)
// To demonstrate that the data exist and is public, we will create
// a *new*, unauthenticated client and fetch the data.
// No keypair or sign-in is required for reading public records.
//================================================================
console.log("\nSTEP 4: READING PUBLIC DATA (ANONYMOUS GET)");

{
const anonymousClient = Client.testnet();
console.log("🕵️  Initializing a new, anonymous client...");
console.log("⏳ Attempting to GET data from the URL without credentials...");

const response = await anonymousClient.fetch(url);

if (response.ok) {
    const receivedData = await response.json();
    console.log("✅ GET successful!");
    console.log("📄 Received public data:", receivedData);
} else {
    console.log("❌ GET failed. Status:", response.status);
}
}


console.log("\nDEMO COMPLETE");
