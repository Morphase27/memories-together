
// Interface for a single message
export interface WhatsAppMessage {
    date: string;
    timestamp: string;
    isSent: boolean;
    content: string;
  }
  
// Interface for the conversation
export interface WhatsAppConversation {
    messages: WhatsAppMessage[];
}

// Function to parse the WhatsApp text
export function parseWhatsAppText(conversation): WhatsAppConversation {
    const messages: WhatsAppMessage[] = [];

    for (const message of conversation) {
        const line = JSON.stringify(message)
        // Regular expression to match WhatsApp message format
        const match = line.match(/^(\d{2}\/\d{2}\/\d{4}), (\d{2}:\d{2}) - ([^:]+): (.+)$/);

        if (match) {
        const [, date, timestamp, sender, content] = match;
        const isSent = sender.trim() === "Gracou";
        messages.push({
            date,
            timestamp,
            isSent,
            content: content.trim()
        });
        }
    }

    return { messages };
}
