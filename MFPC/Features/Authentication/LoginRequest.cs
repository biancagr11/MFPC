using MediatR;
using MFPC.Data;
using MFPC.Data.Models;
using MFPC.Data.Responses;

namespace MFPC.Features.Authentication
{
    public class LoginRequest : IRequest<LoginResponse>
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class LoginRequestHandler : IRequestHandler<LoginRequest, LoginResponse>
    {
        private readonly AppDbContext _context;

        public LoginRequestHandler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<LoginResponse> Handle(LoginRequest request, CancellationToken cancellationToken)
        {
            var authenticatedUser = _context.Users
                .FirstOrDefault(u => u.Username == request.Username && u.Password == request.Password);

            if (authenticatedUser is null)
            {
                return new LoginResponse
                {
                    Result = (int)ResponseResult.Failed
                };
            }

            return new LoginResponse
            {
                FirstName = authenticatedUser.FirstName,
                LastName = authenticatedUser.LastName,
                Id = 1
            };
        }
    }
}
