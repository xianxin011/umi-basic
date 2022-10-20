export function isBuildInApp(): boolean {
  // @ts-ignore;
  if (window && (window.WebViewJavascriptBridge || window.__android)) {
    return true;
  }
  return false;
}
