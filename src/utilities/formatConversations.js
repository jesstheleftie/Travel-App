const getTimePeriods = (conversastionArray) => {
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;
  const sevenDays = 7 * oneDay;
  const thirtyDays = 30 * oneDay;

  return {
    today: now - oneDay,
    yesterday: now - 2 * oneDay,
    last7Days: now - sevenDays,
    last30Days: now - thirtyDays,
  };
};

const formatConversations = (conversations) => {
  const { today, yesterday, last7Days, last30Days } = getTimePeriods();

  const periods = {
    today: { conversation: [] },
    yesterday: { conversation: [] },
    last7: { conversation: [] },
    last30: { conversation: [] },
    more: { conversation: [] },
  };

  conversations.forEach((conversation) => {
    const { lastEditedTime } = conversation;

    if (lastEditedTime > today) {
      periods.today.conversation.push({ conversation });
      periods.today.periodName = "Today";
    } else if (lastEditedTime > yesterday) {
      periods.yesterday.conversation.push({ conversation });
      periods.yesterday.periodName = "Yesterday";
    } else if (lastEditedTime > last7Days) {
      periods.last7.conversation.push({ conversation });
      periods.last7.periodName = "Last 7 Days";
    } else if (lastEditedTime > last30Days) {
      periods.last30.conversation.push({ conversation });
      periods.last30.periodName = "Last 30 Days";
    } else {
      periods.more.conversation.push({ conversation });
      periods.more.periodName = "More";
    }
  });

  return periods;
};

module.exports = formatConversations;

//Generate Random ID
const generateRandomID = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomID = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomID += characters[randomIndex];
  }
  return randomID;
};

//DummyConversation for testing
// const dummyConversationArray = [
//   {
//     id: generateRandomID(16),
//     conversationName: "France",
//     messagesArray: [
//       { person: "assistant", message: "How can I help you today" },
//       { person: "user", message: "Want to go to france" },
//       { person: "assistant", message: "Great let me help you" },
//     ],
//     lastEditedTime: Date.now() - 1 * 60 * 60 * 1000, // 1 hour ago
//   },
//   {
//     id: generateRandomID(16),
//     conversationName: "Italy",
//     messagesArray: [
//       { person: "assistant", message: "How can I help you today" },
//       { person: "user", message: "Want to go to italy" },
//       { person: "assistant", message: "Great let me help you" },
//     ],
//     lastEditedTime: Date.now() - 24 * 60 * 60 * 1000, // 24 hours ago
//   },
//   {
//     id: generateRandomID(16),
//     conversationName: "China",
//     messagesArray: [
//       { person: "assistant", message: "How can I help you today" },
//       { person: "user", message: "Want to go to china" },
//       { person: "assistant", message: "Great let me help you" },
//     ],
//     lastEditedTime: Date.now() - 5 * 24 * 60 * 60 * 1000, // 5 days ago
//   },
//   {
//     id: generateRandomID(16),
//     conversationName: "Japan",
//     messagesArray: [
//       { person: "assistant", message: "How can I help you today" },
//       { person: "user", message: "Want to go to japan" },
//       { person: "assistant", message: "Great let me help you" },
//     ],
//     lastEditedTime: Date.now() - 20 * 24 * 60 * 60 * 1000, // 20 days ago
//   },
//   {
//     id: generateRandomID(16),
//     conversationName: "Germany",
//     messagesArray: [
//       { person: "assistant", message: "How can I help you today" },
//       { person: "user", message: "Want to go to germany" },
//       { person: "assistant", message: "Great let me help you" },
//     ],
//     lastEditedTime: Date.now() - 40 * 24 * 60 * 60 * 1000, // 40 days ago
//   },
// ];

// Testing the formatConversations function with dummy data

module.exports = formatConversations;
