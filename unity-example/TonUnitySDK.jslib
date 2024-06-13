mergeInto(LibraryManager.library, {
  CallFunction: function (fnc, argsStringify) {
    const args = JSON.parse(argsStringify);
    return tonUnitySdkManager.callFunction(fnc, args);
  },
}}