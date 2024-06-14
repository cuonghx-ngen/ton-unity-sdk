import { TonConnectUI, TonConnectUiCreateOptions } from "@tonconnect/ui";

export interface TonUnitySdkManagerOptions {
  tonConnectUiCreateOptions: TonConnectUiCreateOptions;
}

export class TonUnitySdkManager {
  private _tonConnectUI: TonConnectUI;

  constructor(options: TonUnitySdkManagerOptions) {
    this._tonConnectUI = new TonConnectUI(options.tonConnectUiCreateOptions);
  }

  async callFunction(fnc: string, args: string) {
    const parsedArgs = this.jsonStringToArgs(args);

    let result = null;

    switch (fnc) {
      case "connect":
        await this._tonConnectUI.openModal();
        break;
      case "getStatus":
        result = { isConnected: this._tonConnectUI.connected };
        break;
      case "getAccount":
        result = this._tonConnectUI.account;
        break;
      case "disconnect":
        await this._tonConnectUI.disconnect();
        break;
      case "sendTransaction":
        result = await this._tonConnectUI.sendTransaction(parsedArgs);
        break;
      default:
        throw Error("Unsupported function");
    }

    return this.resultToJsonString(result);
  }

  private resultToJsonString(result: any): string {
    if (result == null) {
      return JSON.stringify({});
    } else if (typeof result === "object") {
      return JSON.stringify(result);
    } else {
      throw Error("Invalid result");
    }
  }

  private jsonStringToArgs(args: string) {
    try {
      const parsedArgs = JSON.parse(args);
      if (this.isEmptyObject(parsedArgs)) {
        return undefined;
      }

      return parsedArgs;
    } catch (error) {
      throw Error("Invalid JSON string");
    }
  }

  private isEmptyObject(obj: object): boolean {
    return Object.getOwnPropertyNames(obj).length === 0;
  }
}
