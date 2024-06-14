import {
  SendTransactionRequest,
  SendTransactionResponse,
  TonConnectUI,
  TonConnectUiCreateOptions,
} from "@tonconnect/ui";
import { textToBase64 } from "./utils";

export interface TonUnitySdkManagerOptions {
  tonConnectUiCreateOptions: TonConnectUiCreateOptions;
}

export interface SendTonRequest {
  validUntil: number;
  address: string;
  amount: string;
  comment?: string;
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
        await this.connect();
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
      case "sendTon":
        result = this.sendTon(parsedArgs);
        break;
      default:
        throw Error("Unsupported function");
    }

    return this.resultToJsonString(result);
  }

  async connect() {
    return this._tonConnectUI.openModal();
  }

  async sendTon(args: SendTonRequest): Promise<SendTransactionResponse> {
    const tx: SendTransactionRequest = {
      validUntil: args.validUntil,
      messages: [
        {
          address: args.address,
          amount: args.amount,
          payload: args.comment ? await textToBase64(args.comment) : undefined,
        },
      ],
    };
    return this._tonConnectUI.sendTransaction(tx);
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
