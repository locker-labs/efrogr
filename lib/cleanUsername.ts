export default function cleanUsername(username: string | undefined) {
  if (!username) return "Loading...";
  else if (username.length === 42)
    return `${username.slice(0, 4)}...${username.slice(-4)}`;
  else return `@${username}`;
}
