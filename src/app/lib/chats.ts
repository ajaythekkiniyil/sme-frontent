export async function fetchPersonalChats(id: number) {
    // call api routes GET method with token
    const res = await fetch(`/api/chats/${id}`);
    if (!res.ok) throw new Error("Failed to fetch SMEs details");
    return res.json();
}

export async function sendChatMessage(payload: { message: string; ticket: string; sender: string; receiver: string }) {
  const res = await fetch('/api/chats', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: payload })
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to send message');
  }

  return res.json();
}