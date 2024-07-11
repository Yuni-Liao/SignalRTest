using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace YUNI.Tools.Common
{
    /// <summary>
    /// 這邊所定義的方法，可在 JavaScript 中調用
    /// </summary>
    public class ChatHub : Hub
    {
        /// <summary>
        /// 客戶端添加到群組
        /// </summary>
        /// <param name="groupName"></param>
        /// <returns></returns>
        public async Task AddToGroup(string groupName, string user)
        {
            try { 
                await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
                await Clients.Group(groupName).SendAsync("RecAddGroupMsg", $"{user} 已加入群組 {groupName}.");
            }
            catch
            {
                throw;
            }
         }

        /// <summary>
        /// 客戶端從群組中移除
        /// </summary>
        /// <param name="groupName"></param>
        /// <returns></returns>
        
        public async Task RemoveFromGroup(string groupName)
        {
            try
            {
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
                // 通知此群組中的使用者群組移除完成
                await Clients.Group(groupName).SendAsync("RemoveMessage", $"{Context.ConnectionId} 已離開 {groupName}.");
            }
            catch
            {
                throw;
            }
        }

        /// <summary>
        /// 將消息發送給所有客戶端
        /// </summary>
        /// <param name="user"></param>
        /// <param name="message"></param>
        /// <returns></returns>
        public async Task SendMessageToAll(string user, string message)
        {
            try
            {
                await Clients.All.SendAsync("ReceiveMessageToAll", user, message);
            }
            catch
            {
                throw;
            }
        }
        /// <summary>
        /// 將消息發送給指定的群組
        /// </summary>
        /// <param name="user"></param>
        /// <param name="message"></param>
        /// <param name="groupName"></param>
        /// <returns></returns>
        public async Task SendMessageToGroup(string user, string message, string groupName)
        {
            try
            {
                await Clients.Group(groupName).SendAsync("ReceiveMessageToGroup", groupName, user, message);
            }
            catch 
            {
                throw;
            }
        }
        /// <summary>
        /// 將消息發送給除了指定客戶端之外的所有客戶端
        /// </summary>
        /// <param name="user"></param>
        /// <param name="message"></param>
        /// <param name="connectionId"></param>
        /// <returns></returns>
        public async Task SendMessageToAllExceptClient(string user, string message, string connectionId)
        {
            try
            {
                await Clients.AllExcept(connectionId).SendAsync("ReceiveMessage", user, message);
            }
            catch
            {
                throw;
            }
        }
    }
}
