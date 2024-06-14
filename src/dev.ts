/* @refresh reload */
import { TonUnitySdkManager } from "src/index";
import { SendTransactionRequest, TonConnect } from "@tonconnect/sdk";
// import { beginCell } from "@ton/ton";

// const transactionComment = (text: string) => {
//   const cell = beginCell()
//     .storeUint(0x00000000, 32)
//     .storeStringTail(text)
//     .endCell();

//   const boc = cell.toBoc();
//   return boc.toString("base64");
// };

async function dev(): Promise<void> {
  const connector = new TonConnect({
    manifestUrl:
      "https://raw.githubusercontent.com/cuonghx-ngen/ton-unity-sdk/main/tonconnect-manifest.json",
  });
  const tonUnitySdkManager = new TonUnitySdkManager({
    tonConnectUiCreateOptions: {
      connector,
    },
  });

  /*tonConnectUI.setConnectRequestParameters({ state: 'loading' });

    setInterval(() => {
        tonConnectUI.setConnectRequestParameters({
            state: 'ready',
            value: { tonProof: 'tonProofPayload' + Math.random().toString() }
        });
    }, 3000);*/

  // tonConnectUI.onStatusChange((wallet) => {
  //   document.getElementById("content")!.textContent = wallet
  //     ? JSON.stringify(wallet)
  //     : wallet;
  // });

  /*    tonConnectUI.uiOptions = {
        actionsConfiguration: {
            returnStrategy: 'https://google.com'
        }
    };*/

  /*setTimeout(() => {
        tc.uiOptions = {
            uiPreferences: {
                borderRadius: 'none'
            }
        };
    }, 1500);

    setTimeout(() => {
        tc.uiOptions = {
            uiPreferences: {
                theme: THEME.LIGHT
            }
        };
    }, 3000);*/

  // else show modal and ask user to select a wallet

  /* setTimeout(() => {
        widgetController.openActionsModal('confirm-transaction');
    }, 500);
    setTimeout(() => {
        widgetController.openActionsModal('transaction-sent');
    }, 1000); */

  document.getElementById("send-tx")!.onclick = () => {
    const defaultTx: SendTransactionRequest = {
      validUntil: Math.round(Date.now() / 1000) + 1000,
      messages: [
        {
          address:
            "0:4d5c0210b35daddaa219fac459dba0fdefb1fae4e97a0d0797739fe050d694ca",
          amount: "1000000",
        },
      ],
    };
    return tonUnitySdkManager.callFunction(
      "sendTransaction",
      JSON.stringify(defaultTx)
    );
  };

  document.getElementById("send-tx-with-comment")!.onclick = () => {
    const defaultTx: SendTransactionRequest = {
      validUntil: Math.round(Date.now() / 1000) + 1000,
      messages: [
        {
          address:
            "0:4d5c0210b35daddaa219fac459dba0fdefb1fae4e97a0d0797739fe050d694ca",
          amount: "1000000",
          payload:
            "te6cckEBAQEAHwAAOgAAAAB0ZXN0IHRlc3QgdGVzdCB0ZXN0IHRlc3QgI6+I9g==",
        },
      ],
    };
    return tonUnitySdkManager.callFunction(
      "sendTransaction",
      JSON.stringify(defaultTx)
    );
  };

  document.getElementById("disconnect")!.onclick = () => {
    return tonUnitySdkManager.callFunction("disconnect", "{}");
  };

  document.getElementById("connect")!.onclick = () => {
    return tonUnitySdkManager.callFunction("connect", "{}");
  };

  setInterval(async () => {
    console.log(await tonUnitySdkManager.callFunction("getStatus", "{}"));
    console.log(await tonUnitySdkManager.callFunction("getAccount", "{}"));
  }, 5000);
  //  tc.connectWallet();
  /*
    setTimeout(() => {
        tc.uiOptions = {
            language: 'ru',
            theme: THEME.DARK
        };
    }, 0);
    setTimeout(() => {
        widgetController.openActionsModal('confirm-transaction');
    }, 500);
    setTimeout(() => {
        widgetController.openActionsModal('transaction-sent');
    }, 1000);

    setTimeout(() => {
        widgetController.openActionsModal('transaction-canceled');
    }, 1500);*/
  /*try {
        await tc.connectWallet();

        const defaultTx = {
            validUntil: Date.now() + 1000000,
            messages: [
                {
                    address: '0:412410771DA82CBA306A55FA9E0D43C9D245E38133CB58F1457DFB8D5CD8892F',
                    amount: '20000000'
                },
                {
                    address: '0:E69F10CC84877ABF539F83F879291E5CA169451BA7BCE91A37A5CED3AB8080D3',
                    amount: '60000000'
                }
            ]
        };

        const uiConfig = {
            showModalBefore: true,
            showSuccessModalAfter: true,
            showErrorModalAfter: true
        };

        await tc.sendTransaction(defaultTx, uiConfig);
    } catch (e) {
        console.log(e);
    }*/
}

setTimeout(dev, 500);
