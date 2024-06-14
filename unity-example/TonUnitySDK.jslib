mergeInto(LibraryManager.library, {
  CallFunction: function (fnc, args) {
    return tonUnitySdkManager.callFunction(
      UTF8ToString(fnc),
      UTF8ToString(args)
    );
  },
});
