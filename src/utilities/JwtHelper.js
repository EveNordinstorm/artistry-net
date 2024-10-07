export function decodeToken(token) {
  if (!token) return null;
  const payload = token.split(".")[1];
  const decoded = JSON.parse(atob(payload));
  console.log("Decoded JWT Payload:", decoded);
  return {
    userId:
      decoded[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ],
    ...decoded,
  };
}
