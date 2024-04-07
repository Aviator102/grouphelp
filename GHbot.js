const TelegramBot = require("node-telegram-bot-api");
/**
 * @typedef {import("node-telegram-bot-api")} TelegramBot
 */


//BASIC DECLARATIONS
/**
 * @typedef {Object} AnonTGUser - Descrizione di base dell'oggetto.
 * @property {String|Number} id - userId
 */


//PERMISSIONS
/**
 * @typedef {Object} LGHPerms - LGHPerms Object.
 * @property {Array.<string>} commands - Array of commands, if starts with "COMMAND_" means its to be translated, otherwise is the literal command.
 * @property {1|0|-1} immune - Active if this user can't receive any punishment (kick/warn/mute/ban) [1/0/-1](TO IMPLEMENT).
 * @property {1|0|-1} flood - Permission to flood messages [1/0/-1].
 * @property {1|0|-1} link - Permission to send links [1/0/-1].
 * @property {1|0|-1} tgLink - Permission to send telegram links/usernames [1/0/-1].
 * @property {1|0|-1} forward - Permission to forward messages from anywhere [1/0/-1].
 * @property {1|0|-1} quote - Permission to quote from anywhere [1/0/-1].
 * @property {1|0|-1} porn - Bypass porn/gore checks [1/0/-1].
 * @property {1|0|-1} night - Bypass any night mode limitation [1/0/-1].
 * @property {1|0|-1} media - Bypass any media limitation [1/0/-1].
 * @property {1|0|-1} roles - Permission to change roles of lower level users [1/0/-1].
 * @property {1|0|-1} settings - Permission to change bot group settings [1/0/-1].
 */


//MESSAGEMAKER
/**
 * @typedef {Object} simpleMedia - object with data about an user in a group
 * @property {String|false} type - Type of media (audio, photo, video, video_note, animation, sticker, document) or false
 * @property {String} fileId - media fileId or false
 * @property {Object} options - additional options for TelegramBot
 */
/**
 * @typedef {Object} customMessage - object with data about an user in a group
 * @property {String} text - Text of messsage
 * @property {Array.<TelegramBot.MessageEntity>} entities - Telegram entities of text
 * @property {Array.<String>} roles - array user roles, string for pre-made roles, number for custom roles (user-made)
 * @property {Boolean} format - true if message should be formatted (enabled by default), mean that entities should be passed on sendMessage function
 * @property {simpleMedia} media - user administrator title
 * @property {String} buttons - can be transformed in inline_keyboard with parseTextToInlineKeyboard()
 * @property {Array.<TelegramBot.KeyboardButton>} buttonsParsed - already parsed buttons ready to use for inline_keyboard
 */


//CUSTOMCHAT DECLARATIONS
/**
 * @typedef {Array.<TelegramBot.ChatAdministratorRights & {user: AnonTGUser} & {status: TelegramBot.ChatMemberStatus}>} LGHAdminList
 */

/**
 * @typedef {Object} userStatus - object with data about an user in a group
 * @property {Number} warnCount - number of user warns
 * @property {LGHPerms} perms - LGHPerms object for all user-specific permissions
 * @property {Array.<String>} roles - array user roles, string for pre-made roles, number for custom roles (user-made)
 * @property {LGHPerms} adminPerms - LGHPerms object for user permissions if admin
 * @property {String} title - user administrator title
 */

/**
 * @typedef {Object} LGHRole - if pre-made role (string key) only users object should be used
 * @property {String|null} name - role name
 * @property {String|null} emoji - emoji for the role
 * @property {Number|null} level - role level, higher level users can use commands that affect  lower level users
 * @property {LGHPerms|null} perms - LGHPerms object applyed at lowest priority on any user in this role
 * @property {Array.<String>} users - array of userId in this role
 */

/**
 * @typedef {Object} LGHWarns - warns.js plugin related data
 * @property {Object.<string, Number>} timed - ([userId]: [endTime, endTime, endTime]) contains necerray data to revoke scheduled warns when  time is over
 * @property {Number} limit - number of warns after wich should be applyed a punishment
 * @property {2|3|4} punishment - punishment when limit is hit [2:kick|3:mute|4:ban]
 * @property {Number|null} PTime - avaiable if punishment is set to warn/mute/ban, contains seconds of punishment
 */

/**
 * @typedef {Object} LGHWelcome - welcome.js settings Object.
 * @property {boolean} state - True if welcome is enabled (default false).
 * @property {boolean} once - True if should be sent only at first user join (default false).
 * @property {boolean} clean - True if last welcome message on the group should be (default false).
 * @property {Array.<string|number>} joinList - cronology of users that joined the group over time.
 * @property {string|number|boolean} lastWelcomeId - MessageId of last welcome message sent, useful if clean is enabled, false if never sent one before.
 * @property {customMessage} message - CustomMessage object.
 */

/**
 * @typedef {Object} LGHFlood - antiflood.js settings Object.
 * @property {Number} messages - Number of messages needed to trigger the Antiflood.
 * @property {Number} time - Seconds within the specified message should be sent to trigger the Antiflood.
 * @property {Number} punishment - Punishment to apply at the user that triggers the Antiflood [0:off|1:warn|2:kick|3:mute|4:ban].
 * @property {Number|null} PTime - Available if punishment is set to warn/mute/ban, contains seconds of punishment.
 * @property {boolean} delete - True if flooded messages should be deleted.
 */

/**
 * @typedef {Object} CustomChat - Additional chat elements for chat object by LibreGroupHelp
 * @property {LGHAdminList|null} admins - array with known admins objects (user data anonymized)
 * @property {String|null} lang - current chat lang
 * @property {Boolean} isGroup - result of (chat.type == "supergroup" || chat.type == "group")
 * @property {Object.<string, userStatus>|null} users - Object-IdName based data about every user in the group (ex. users[643547] access data of userId 643547)
 * @property {Object.<string, roleData>|null} roles - data about a specific role, full role Object if it's a custom role (key with a number)
 * @property {LGHWarns|null} warns - warns.js plugin related data
 * @property {customMessage|null} rules - rules.js plugin related data
 * @property {LGHWelcome|null} welcome - welcome.js plugin related data
 * @property {LGHFlood|null} flood - flood.js plugin related data
 */

/**
 * @typedef {TelegramBot.Chat & CustomChat} LGHChat - Full LGH chat object given by LGHBot events, custom items avaiable if working about a group
 */

/**
* @returns {LGHChat} testing jsdoc advices
*/
function testObject() {
   return ""
}
testObject()


//CUSTOM USER DECLARATIONS
/**
 * @typedef {Object} CustomUser
 * @property {LGHPerms|null} perms - temporary object with summary of user permissions
 * @property {String} lang - current user lang
 * @property {Boolean} waitingReply - set to true if the bot is expecting a message from the user
 * @property {any} waitingReplyType - additional data related to waitingReply
 */

/**
 * @typedef {TelegramBot.User & CustomUser} LGHUser - Custom chat object given by LGHBot events, custom items avaiable if working about a group
 */


//CUSTOM MESSAGE DECLARATIONS
/**
 * @typedef {Object} ParsedCommand - ParsedCommand Object.
 * @property {string} text - The original text input.
 * @property {string} prefix - The prefix used in the command (e.g., "/", "!", ".").
 * @property {string} botCommand - The command with bot name (e.g., "start@usernamebot").
 * @property {string} name - The name of the command.
 * @property {string} bot - The bot name (if available).
 * @property {(string|boolean)} args - The arguments of the command (optional).
 * @property {(Array.<string>|boolean)} splitArgs - The split arguments of the command (optional).
 */

/**
 * @typedef {Object} CustomMessage
 * @property {ParsedCommand} command - result of message text parsed with parseCommand()
 */

/**
 * @typedef {TelegramBot.Message & CustomMessage} LGHMessage - Custom chat object given by LGHBot events, custom items avaiable if working about a group
 */


//DATABASE
/**
 * @typedef {Function} AddChatFunction
 * @param {LGHChat} chat - The chat object to add.
 * @returns {Boolean} True if the chat was successfully added, otherwise false.
 */

/**
 * @typedef {Function} DeleteChatFunction
 * @param {TelegramBot.ChatId} chatId - The ID of the chat to delete.
 * @returns {Boolean} True if the chat was successfully deleted, otherwise false.
 */

/**
 * @typedef {Function} ExistChatFunction
 * @param {TelegramBot.ChatId} chatId - The ID of the chat to check.
 * @returns {Boolean} True if the chat exists in the database, otherwise false.
 */

/**
 * @typedef {Function} GetChatFunction
 * @param {TelegramBot.ChatId} chatId - The ID of the chat to retrieve.
 * @returns {LGHChat|false} The retrieved chat object if found, otherwise false.
 */

/**
 * @typedef {Function} UpdateChatFunction
 * @param {LGHChat} chat - The updated chat object.
 * @returns {Boolean} True if the chat was successfully updated, otherwise false.
 */

/**
 * @typedef {Function} SaveChatFunction
 * @param {TelegramBot.ChatId} chatId - The ID of the chat to save.
 * @returns {Boolean} True if the chat was successfully saved, otherwise false.
 */

/**
 * @typedef {Object} chatsDatabase - Object containing chat-related database functions.
 * @property {AddChatFunction} add - Function to add a new chat to the database.
 * @property {DeleteChatFunction} delete - Function to delete a chat from the database.
 * @property {ExistChatFunction} exist - Function to check if a chat exists in the database.
 * @property {GetChatFunction} get - Function to retrieve a chat from the database.
 * @property {UpdateChatFunction} update - Function to update a chat in the database.
 * @property {SaveChatFunction} save - Function to save a chat to the database.
 */

/**
 * @typedef {Function} AddUserFunction
 * @param {LGHUser} user - The user object to add.
 * @returns {Boolean} Result of adding a user to the database.
 */

/**
 * @typedef {Function} DeleteUserFunction
 * @param {TelegramBot.ChatId} userId - The ID of the user to delete.
 * @returns {Boolean} Result of deleting a user from the database.
 */

/**
 * @typedef {Function} ExistUserFunction
 * @param {TelegramBot.ChatId} userId - The ID of the user to check.
 * @returns {Boolean} Indicates whether the user exists in the database.
 */

/**
 * @typedef {Function} GetUserFunction
 * @param {TelegramBot.ChatId} userId - The ID of the user to retrieve.
 * @returns {LGHUser} Data retrieved for the user from the database.
 */

/**
 * @typedef {Function} UpdateUserFunction
 * @param {LGHUser} user - The updated user object.
 * @returns {boolean} True if the user was successfully updated, otherwise false.
 */

/**
 * @typedef {Object} usersDatabase - Object containing user-related database functions.
 * @property {Function} add - Function to add a new user to the database.
 * @property {Function} delete - Function to delete a user from the database.
 * @property {Function} exist - Function to check if a user exists in the database.
 * @property {Function} get - Function to retrieve a user from the database.
 * @property {Function} update - Function to update a user in the database.
 */

/**
 * @typedef {Object} LGHDatabase - Type returned by the getDatabase function.
 * @property {string} innerDir - Location where the database folder should be placed (and/or generated).
 * @property {string} dir - Full path to the database folder.
 * @property {string} chatsDir - Full path to the chats folder within the database.
 * @property {string} usersDir - Full path to the users folder within the database.
 * @property {chatsDatabase} chats - Object containing chat-related database functions.
 * @property {usersDatabase} users - Object containing user-related database functions.
 * @property {Function} unload - Function to unload chats from memory.
 */


//TEMPLATE DECLARATION
/**
 * @typedef {Object} LibreGHelp
 * @property {TelegramBot} GHbot - Test
 * @property {TelegramBot} TGbot - Test
 * @property {LGHDatabase} db - Test
 */

/**
 * @class
 * @classdesc
 * @param {LibreGHelp} LibreGHelp -Test
 */
class main {
    constructor(LibreGHelp) {

        /**
        * @type {TelegramBot}
        */
        this.GHbot = LibreGHelp.GHbot;

        /**
         * @type {TelegramBot}
         */
        this.TGbot = LibreGHelp.TGbot;

        /**
         * @type {LGHDatabase}
         */
        this.db = LibreGHelp.db;


        /**
         * @type {Object}
         */
        this.config = LibreGHelp.config;

    }

    /**
     * LGHbot message event handler
     * @param {(arg1: LGHMessage, arg2: LGHChat, arg3: LGHUser) => void} handler - handler function
     */
    onMessage(handler) {
        this.GHbot.on("message", handler);
    }

    /**
     * LGHbot callback event handler
     * @param {(arg1: TelegramBot.CallbackQuery, arg2: LGHChat, arg3: LGHUser) => void} handler - handler function
     */
    onCallback(handler) {
        this.GHbot.on("callback_query", handler);
    }


    //undocumented for retrocompatibility
    on(eventName, handler) {
        this.GHbot.on(eventName, handler);
    }
}

module.exports = main;
