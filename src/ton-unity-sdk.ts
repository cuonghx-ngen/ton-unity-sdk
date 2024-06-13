import { TonConnectUI, TonConnectUiCreateOptions } from "@tonconnect/ui";

export interface TonUnitySdkManagerOptions {
  tonConnectUiCreateOptions: TonConnectUiCreateOptions;
}

export type TonUnitySdkManagerSupportedFunctions =
  | {
      fnc: "connectWallet";
    }
  | {
      fnc: "connected";
    };

export class TonUnitySdkManager {
  private _tonConnectUI: TonConnectUI;

  constructor(options: TonUnitySdkManagerOptions) {
    this._tonConnectUI = new TonConnectUI(options.tonConnectUiCreateOptions);
  }

  callFunction(fnc: TonUnitySdkManagerSupportedFunctions["fnc"]) {
    switch (fnc) {
      case "connectWallet":
        return this._tonConnectUI.openModal();
      default:
        throw Error("Unsupported function");
    }
  }
}
