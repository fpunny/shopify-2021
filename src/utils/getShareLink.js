export default function getShareableLink(nominations, name) {
  const payload = btoa(JSON.stringify({ nominations, name }));
  return `${window.location.origin}/share/${payload}`;
}
