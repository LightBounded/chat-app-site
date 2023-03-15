import Auth from "./components/Auth";
import Chat from "./components/Chat";
import { useUserStore } from "./stores/users";

function App() {
  const { activeUserId } = useUserStore();

  if (!activeUserId) {
    return <Auth />;
  }

  return <Chat />;
}

export default App;
