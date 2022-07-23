import type { NextPage } from "next";
// import useSWR from "swr";
import Head from "next/head";
import styles from "../../styles/Home.module.sass";
import Navbar from "../../components/Navbar";
import React, { useCallback, useEffect, useState } from "react";
import Footer from "../../components/Footer";
import EligibilityChecker from "../../components/EligibilityChecker";
import ConnectButton from "../../components/ConnectButton";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { AbiItem } from "web3-utils";
import { ethRpcError } from "../../lib/ErrorHandler";
import detectEthereumProvider from "@metamask/detect-provider";
import { Loading } from "../../components/Loading";
import { useRouter } from "next/router";
import fw from "../../lib/FetchWrapper";
import { userAccess } from "../../lib/UserAccess";

// const fetcher = (...args: any[]) =>
//   // @ts-ignore
//   fetch(...args).then((res) => res.json());

function isSupportedNetwork(chainId: number): boolean {
  if (process.env.NODE_ENV === "development") {
    return true;
  }
  return chainId === 1; // Ethereum Mainnet
}

const Home: NextPage = () => {
  const router = useRouter();

  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [errorInfo, setErrorInfo] = useState<string | null>(null);
  const [networkSupported, setNetworkSupported] = useState(true);
  const [noMetamask, setNoMetamask] = useState(false);
  const [page, setPage] = useState(0);

  const onAccountsChanged = (accs: any) => {
    console.log("onAccountsChanged", accs);
    if (accs.length === 0) {
      setCurrentAccount(null);
      return;
    }
    if (currentAccount !== accs[0]) {
      // clear up user access local storage
      userAccess.clear();
    }
    setCurrentAccount(accs[0]);
  };
  const onNetworkChanged = async (network: any) => {
    console.log(
      "🚀 ~ file: index.tsx ~ line 74 ~ onNetworkChanged ~ network",
      network
    );
    if (network) {
      checkNetwork();
    }
  };

  const checkNetwork = () => {
    const chainId = parseInt((window.ethereum as any)?.chainId, 16);
    if (isNaN(chainId)) {
      return;
    }
    console.log("onNetworkChanged", chainId);
    setNetworkSupported(isSupportedNetwork(chainId));
  };

  useEffect(() => {
    const ethereum: any = window.ethereum;
    if (ethereum?.on) {
      ethereum.on("accountsChanged", onAccountsChanged);
      ethereum.on("networkChanged", onNetworkChanged);
    }

    checkNetwork();

    return () => {
      const ethereum: any = window.ethereum;
      if (ethereum?.removeListener) {
        ethereum.removeListener("accountsChanged", onAccountsChanged);
        ethereum.removeListener("networkChanged", onNetworkChanged);
      }
    };
  }, []);

  useEffect(() => {
    async function fetchData() {
      console.log("detectEthereumProvider...");
      try {
        const provider: any = await detectEthereumProvider();
        if (!provider) {
          setErrorInfo(
            "You have no Metamask installed, please install Metamask first"
          );
          setNoMetamask(true);
          return;
        }
        console.log(
          "🚀 ~ file: index.tsx ~ line 142 ~ fetchData ~ provider",
          provider
        );
        const _web3 = new Web3(provider);
        setWeb3(_web3);
        console.log("web3 loaded");
      } catch (err) {
        console.log("web3 not loaded");
        console.log("ERROR:", err);
        setErrorInfo("Cannot load Web3");
      }
    }
    fetchData();
  }, []);

  const links = [
    { href: "/dashboard#tab1", label: "Tab 1" },
    { href: "/dashboard#tab2", label: "Tab 2" },
  ];

  useEffect(() => {
    if (currentAccount) {
      const path = router.asPath.trim();
      console.log(path);
      if (path.match(/#tab1$/gi)) {
        setPage(0);
      }
      if (path.match(/#tab2$/gi)) {
        setPage(1);
      }
    }
  }, [router, currentAccount]);

  return (
    <div className={`${styles.container} pt-16 md:pt-0`}>
      <Head>
        <title>$name$</title>
        <meta
          name="description"
          content="$param.description$"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="blur-dot-yellow" />

      <Navbar links={links} />

      <div id="modal-root"></div>

      <main className={`${styles.main} flex flex-col w-full items-center`}>
        {!networkSupported && (
          <div className="p-5 bg-orange-500 rounded-xl mb-10">
            Network not supported, please change to Ethereum mainnet
          </div>
        )}

        {errorInfo && (
          <div className="p-5 bg-red-500 rounded-xl mb-10">
            ERROR: {errorInfo}
          </div>
        )}

        {!currentAccount && <Loading className="p-10" />}

        {!noMetamask && (
          <div>
            <ConnectButton
              setAccount={(acc) => setCurrentAccount(acc)}
              noConnectedInfo={false}
              currentAddress={currentAccount}
              onError={(err) => {
                setErrorInfo(
                  "No Metamask detected, make sure you have Metamask installed on your browser"
                );
                setNoMetamask(true);
              }}
            />
          </div>
        )}

        {page == 0 && currentAccount && (<h2>Tab 1</h2>)}
        {page == 1 && currentAccount && (<h2>Tab 2</h2>)}
      </main>

      <Footer />
    </div>
  );
};

export default Home;

function watchTransaction(web3: Web3, txHash: any): Promise<any> {
  console.log("🚀 tx.hash", txHash);
  return new Promise<any>((resolve, reject) => {
    web3.eth
      .getTransactionReceipt(txHash)
      .then((receipt: any) => {
        if (!receipt || !receipt.status) {
          resolve(null);
          return;
        }

        if (receipt.blockNumber > 0) {
          // onMintSuccess(tx);
          // setInCreating(false);
          resolve(receipt);
        }
      })
      .catch((err: any) => {
        console.error(err);
        console.log("Cannot watch transaction");
        reject(err);
      });
  });
}
