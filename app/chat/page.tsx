import Chat from '../components/Chat';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export default function ChatPage() {
  return (
    <>
      <Chat />
    </>
  );
}
