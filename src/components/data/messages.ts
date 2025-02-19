
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
function parseWhatsAppText(text: string): WhatsAppConversation {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const messages: WhatsAppMessage[] = [];

    for (const line of lines) {
        // Regular expression to match WhatsApp message format
        const match = line.match(/^(\d{2}\/\d{2}\/\d{4}), (\d{2}:\d{2}) - ([^:]+): (.+)$/);

        if (match) {
        const [, date, timestamp, sender, content] = match;

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
