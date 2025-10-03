import { useEffect, useState } from "react";
import { Network } from "@capacitor/network";
import { PluginListenerHandle } from "@capacitor/core";

export const useConnection = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const checkNetwork = async () => {
      const status = await Network.getStatus();
      setIsConnected(status.connected);
    };

    checkNetwork();

    let listenerHandle: PluginListenerHandle | undefined;

    Network.addListener("networkStatusChange", (status) => {
      console.log("Network status changed", status);
      setIsConnected(status.connected);
    }).then((handle) => {
      listenerHandle = handle;
    });

    return () => {
      if (listenerHandle) {
        listenerHandle.remove();
      }
    };
  }, []);

  return {
    isConnected,
  };
};
