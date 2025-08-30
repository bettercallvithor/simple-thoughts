using Microsoft.AspNetCore.SignalR;

namespace SimpleThoughts.Hubs;

public class ThoughtHub : Hub
{
    public async Task SendThought(string thought)
    {
        await Clients.Others.SendAsync("ReceiveThought", thought);
    }
}
