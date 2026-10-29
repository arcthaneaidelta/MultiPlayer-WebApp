import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageSquare, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { ChatMessage } from '../../types/session';

interface PartyChatProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  activePlayerName: string;
}

export const PartyChat: React.FC<PartyChatProps> = ({ messages, onSendMessage, activePlayerName }) => {
  const [inputText, setInputText] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isCollapsed]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  return (
    <div
      style={{
        backgroundColor: '#181B19',
        border: '1px solid #2C322E',
        borderRadius: '18px',
        overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '0.75rem 1rem',
          backgroundColor: '#202421',
          borderBottom: '1px solid #2C322E',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <MessageSquare size={16} color="#C99B55" />
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#F5F2EA' }}>
            Investigation Party Radio ({messages.length})
          </span>
          <span className="badge badge-dark-amber" style={{ fontSize: '0.65rem' }}>
            Live
          </span>
        </div>
        <button
          style={{ background: 'none', color: '#9FA499', padding: '0.2rem' }}
          aria-label={isCollapsed ? 'Expand chat' : 'Collapse chat'}
        >
          {isCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
        </button>
      </div>

      {/* Messages list */}
      {!isCollapsed && (
        <>
          <div
            ref={scrollRef}
            style={{
              maxHeight: '190px',
              minHeight: '130px',
              overflowY: 'auto',
              padding: '0.85rem 1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.65rem',
            }}
          >
            {messages.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#7E8478', fontSize: '0.8125rem', padding: '1rem' }}>
                No radio chatter yet. Communicate with your squad below.
              </div>
            ) : (
              messages.map((m) => (
                <div
                  key={m.id}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.55rem',
                    fontSize: '0.8125rem',
                  }}
                >
                  <div
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      backgroundColor: m.isSystem ? '#727B61' : '#2D332F',
                      color: '#E0BA7A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.65rem',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  >
                    {m.senderAvatar || 'QR'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.15rem' }}>
                      <span style={{ fontWeight: 600, color: '#E0BA7A' }}>
                        {m.senderName}
                      </span>
                      {m.senderRole && (
                        <span style={{ fontSize: '0.65rem', color: '#7E8478' }}>
                          • {m.senderRole}
                        </span>
                      )}
                      <span style={{ fontSize: '0.65rem', color: '#686D62', marginLeft: 'auto' }}>
                        {m.timestamp}
                      </span>
                    </div>
                    <div
                      style={{
                        backgroundColor: m.isSystem ? 'rgba(114, 123, 97, 0.15)' : '#222724',
                        padding: '0.45rem 0.75rem',
                        borderRadius: '10px',
                        color: m.isSystem ? '#DDE1D4' : '#E8EBE3',
                        lineHeight: 1.45,
                        border: '1px solid #2D332F',
                      }}
                    >
                      {m.text}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Chat Input */}
          <form
            onSubmit={handleSubmit}
            style={{
              padding: '0.65rem 0.85rem',
              backgroundColor: '#1C201E',
              borderTop: '1px solid #2C322E',
              display: 'flex',
              gap: '0.5rem',
            }}
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Radio message from ${activePlayerName}...`}
              className="input-text input-dark font-mono"
              style={{
                fontSize: '0.8125rem',
                minHeight: '38px',
                padding: '0.45rem 0.75rem',
                borderRadius: '8px',
              }}
            />
            <button
              type="submit"
              className="btn btn-amber btn-sm"
              style={{
                padding: '0.45rem 0.85rem',
                borderRadius: '8px',
                minHeight: '38px',
              }}
              disabled={!inputText.trim()}
            >
              <Send size={14} />
            </button>
          </form>
        </>
      )}
    </div>
  );
};

