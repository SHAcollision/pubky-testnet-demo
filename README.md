# Pubky Testnet Demo

A simple, command-line demonstration of the [`@synonymdev/pubky`](https://www.npmjs.com/package/%40synonymdev/pubky) library using a local `pubky-testnet` instance.

This script showcases the core lifecycle of managing public data using a decentralized identity against a testnet (offline) homeserver.

1.  Creating a new cryptographic identity (keypair).
2.  Signing up on a homeserver.
3.  Writing (PUT) public data as an authenticated user.
4.  Reading (GET) that data as an anonymous user.

## Setup and Run

Follow these steps to get the full demo running on your local machine.

### Step 1: Install Prerequisites

You will need the following software installed on your system:

- **Node.js:** Version **20 or higher**. You can download it from [nodejs.org](https://nodejs.org/).
- **Rust & Cargo:** Required to install and run the local testnet binary. You can install it from [rust-lang.org](https://www.rust-lang.org/tools/install).

### Step 2: Run the Local Testnet

The demo script needs to connect to a local `pubky-testnet` homeserver.

The `pubky-testnet` binary will create:

- A local DHT with bootstrapping nodes: `["localhost:6881"]`
- A Pkarr Relay running on port `15411`
- A Homeserver with address is hardcoded to `8pinxxgqs41n4aididenw5apqp1urfmzdztr8jt4abrkdn435ewo`
- An HTTP relay running on port `15412`

1.  **Install the `pubky-testnet` binary using Cargo:**

    ```sh
    cargo install pubky-testnet
    ```

2.  **(Optional) Create a configuration file.** For this demo, the homeserver needs to allow open signups. Create a file named `config.toml` with the following content:

    ```toml
    [general]
    signup_mode = "open"
    ```

3.  **Run the testnet server.** Execute the command below. This will start all the necessary local services (DHT, Pkarr Relay, Homeserver). **Keep this terminal window open and running.**

    ```sh
    pubky-testnet --homeserver-config=config.toml
    ```

### Step 3: Run the Demo Script

Now, **in a new terminal window**, run the JavaScript client script.

1.  **Clone the Repository:**

    ```sh
    git clone https://github.com/SHAcollision/pubky-testnet-demo.git
    cd pubky-testnet-demo
    ```

2.  **Install Node.js Dependencies:**

    ```sh
    npm install
    ```

3.  **Execute the Demo:**

    ```sh
    node test.mjs
    ```

## Expected Output

The terminal running the demo script will display a step-by-step log of the operations. The output will look similar to this (note that your public key will be different each time):

```
STEP 1: INITIALIZATION & KEY GENERATION
✔️ Pubky client initialized for testnet.
✔️ New cryptographic keypair generated.
👤 Public Key (z32): fyizgkdz1orsywj1eruhqjrhf9xmx5eofuufeqk8e7btju34r3co

STEP 2: ACCOUNT SIGNUP & SESSION VERIFICATION
🏠 Using homeserver: 8pinxxgqs41n4aididen...
⏳ Attempting to sign up new account on the homeserver...
✅ Signup successful!
✅ Session verified. User is signed in.

STEP 3: WRITING DATA (AUTHENTICATED PUT)
🔗 Target URL for our data: pubky://fyizgkdz1orsywj1eruhqjrhf9xmx5eofuufeqk8e7btju34r3co/pub/example.com/demo.json
✅ PUT successful. Data is now stored.

STEP 4: READING PUBLIC DATA (ANONYMOUS GET)
🕵️  Initializing a new, anonymous client...
⏳ Attempting to GET data from the URL without credentials...
✅ GET successful!
📄 Received public data: { foo: 'bar' }

DEMO COMPLETE
```

## License

This project is licensed under the MIT License.
