using System;

namespace API.Services.interfaces;

public interface AccountInterface
{
    Task<bool> CheckEmailExists(string email);
}
