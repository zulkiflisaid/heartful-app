import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { mockChatMessages } from '@/data/mock';
import PageHeader from '@/components/PageHeader';
import type { ChatMessage } from '@/types';

const ChatDetail = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'user', message: input, timestamp: new Date().toISOString() }]);
    setInput('');
    // Simulate reply
    setTimeout(() => {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), sender: 'admin', message: 'Terima kasih, kami akan segera membantu Anda.', timestamp: new Date().toISOString() }]);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <PageHeader title="CS Toko" />

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${msg.sender === 'user' ? 'rounded-br-md bg-primary text-primary-foreground' : 'rounded-bl-md bg-secondary'}`}>
              {msg.message}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border bg-card p-3 safe-bottom">
        <div className="flex gap-2">
          <Input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="Tulis pesan..." className="h-10 flex-1 rounded-xl" />
          <button onClick={handleSend} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatDetail;
