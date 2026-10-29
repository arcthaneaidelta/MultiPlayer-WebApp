export interface DemoOrder {
  id: string; // e.g., "ORD-7841"
  orderNumber: string; // e.g., "#1092"
  productName: string;
  tierName: string;
  playerCapacity: number;
  customerName: string;
  customerEmail: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'refunded';
  createdAt: string;
  gameSessionId: string;
  roomCode: string;
  invitationUrl: string;
  activationCode: string;
  notes: string;
}

export interface CheckoutFormState {
  fullName: string;
  email: string;
  tier: 'standard' | 'deluxe';
  cardNumber: string;
  expiry: string;
  cvv: string;
}

