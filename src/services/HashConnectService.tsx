"use client";
import { HashConnect, HashConnectConnectionState, SessionData, UserProfile } from 'hashconnect';
import { useState } from "react";
import { LedgerId } from '@hashgraph/sdk';

export default function HashConnectService({ children }:{children:any}) {
    const [hashConnectionState, setHashConnectionState] = useState<HashConnectConnectionState>(HashConnectConnectionState.Disconnected)
    const [userProfile, setUserProfile] = useState<UserProfile|null>(null)
    const appMetadata = {
        name: "Lynxify",
        description: "Eth / Hedera Wallet & Dex",
        icons: ["<Image url>"],
        url: "localhost"
    }
    
    let hashconnect: HashConnect;
    let pairingData: SessionData|null;

    function setUpHashConnectEvents() {
        hashconnect.pairingEvent.on((newPairing) => {
            pairingData = newPairing;
        })
    
        hashconnect.disconnectionEvent.on((data) => {
            pairingData = null;
        });
    
        hashconnect.connectionStatusChangeEvent.on((connectionStatus) => {
            setHashConnectionState(connectionStatus);
        })
    }

    const initHashconnect = async () => {
        hashconnect = new HashConnect(LedgerId.TESTNET, import.meta.env.VITE_WALLETCONNECT_PROJECT_ID as string, appMetadata, true);
        setUpHashConnectEvents();
        await hashconnect.init();
        hashconnect.openPairingModal();
        getUserProfile()
    }

    const getUserProfile = async () => {
        let user:UserProfile

        if(pairingData) {
            try {
                user = await hashconnect.getUserProfile(pairingData.accountIds[0], "testnet")
                if(user !== null) {
                    setUserProfile(user)
                    console.log("fetching user profile...")
                    console.log(user)
                }
                
            } catch (error) {
                console.log(error)
            }
        }
    }
  
    return(
        <>
            <button disabled={hashConnectionState === HashConnectConnectionState.Connected || hashConnectionState === HashConnectConnectionState.Paired || hashConnectionState === HashConnectConnectionState.Connecting} onClick={initHashconnect}>
                {hashConnectionState === HashConnectConnectionState.Connected || hashConnectionState === HashConnectConnectionState.Paired && (
                    <>Hedera Connected {userProfile?.currency}</>
                )}
                {hashConnectionState === HashConnectConnectionState.Disconnected && (
                    <>Connect Hedera</>
                )}
                {hashConnectionState === HashConnectConnectionState.Connecting && (
                    <>Connecting...</>
                )}
                
            </button>
            {children}
        </>
    )
  }