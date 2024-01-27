using MediatR;
using MFPC.Features.Authentication;
using Microsoft.AspNetCore.Mvc;

namespace MFPC.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly IMediator _mediator;

        public LoginController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            var result = await _mediator.Send(loginRequest);

            return Ok(result);
        }
    }
}
