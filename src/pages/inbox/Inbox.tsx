import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, MessageSquare, HelpCircle, Package, CreditCard, Tag, UserCheck } from 'lucide-react';
import { mockNotifications, mockChatConversations, mockTickets, formatDate } from '@/data/mock';
import { Badge } from '@/components/ui/badge';

const typeIcon = {
  order: <Package className="h-4 w-4" />,
  payment: <CreditCard className="h-4 w-4" />,
  promo: <Tag className="h-4 w-4" />,
  account: <UserCheck className="h-4 w-4" />,
};

const typeColor = {
  order: 'bg-blue-50 text-blue-600',
  payment: 'bg-green-50 text-green-600',
  promo: 'bg-orange-50 text-orange-600',
  account: 'bg-purple-50 text-purple-600',
};

const InboxPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'notif' | 'chat' | 'ticket'>('notif');
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-40 bg-card px-4 py-4 safe-top">
        <h1 className="text-xl font-bold">Inbox</h1>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border px-4">
        {[
          { key: 'notif' as const, label: 'Notifikasi', icon: <Bell className="h-4 w-4" />, badge: unreadCount },
          { key: 'chat' as const, label: 'Chat', icon: <MessageSquare className="h-4 w-4" /> },
          { key: 'ticket' as const, label: 'Tiket', icon: <HelpCircle className="h-4 w-4" /> },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} className={`flex flex-1 items-center justify-center gap-1.5 border-b-2 py-3 text-sm font-medium transition-colors ${tab === t.key ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'}`}>
            {t.icon} {t.label}
            {t.badge ? <Badge variant="destructive" className="ml-1 h-5 min-w-5 px-1 text-[10px]">{t.badge}</Badge> : null}
          </button>
        ))}
      </div>

      <div className="px-4 py-3">
        {/* Notifikasi */}
        {tab === 'notif' && (
          <div className="space-y-2">
            {mockNotifications.map(n => (
              <div key={n.id} className={`flex gap-3 rounded-xl p-3 ${n.read ? 'bg-background' : 'bg-primary/5'}`}>
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${typeColor[n.type]}`}>
                  {typeIcon[n.type]}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{n.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{n.message}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">{formatDate(n.createdAt)}</p>
                </div>
                {!n.read && <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />}
              </div>
            ))}
          </div>
        )}

        {/* Chat */}
        {tab === 'chat' && (
          <div className="space-y-2">
            {mockChatConversations.map(c => (
              <div key={c.id} onClick={() => navigate(`/inbox/chat/${c.id}`)} className="flex cursor-pointer items-center gap-3 rounded-xl p-3 hover:bg-secondary">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {c.adminName[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">{c.adminName}</p>
                    <p className="text-[11px] text-muted-foreground">{formatDate(c.lastTimestamp)}</p>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">{c.lastMessage}</p>
                </div>
                {c.unreadCount > 0 && (
                  <Badge variant="destructive" className="h-5 min-w-5 px-1.5 text-[10px]">{c.unreadCount}</Badge>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tickets */}
        {tab === 'ticket' && (
          <div className="space-y-2">
            <button onClick={() => navigate('/inbox/ticket/new')} className="mb-2 w-full rounded-xl border-2 border-dashed border-border py-3 text-sm font-medium text-primary hover:bg-secondary">
              + Buat Tiket Baru
            </button>
            {mockTickets.map(t => (
              <div key={t.id} className="rounded-xl border border-border p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{t.id}</span>
                  <Badge variant={t.status === 'resolved' ? 'default' : 'secondary'} className="text-[10px]">
                    {t.status === 'open' ? 'Dibuka' : t.status === 'in_progress' ? 'Diproses' : t.status === 'resolved' ? 'Selesai' : 'Ditutup'}
                  </Badge>
                </div>
                <p className="mt-1 text-sm font-semibold">{t.subject}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{t.category} • {formatDate(t.createdAt)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InboxPage;
