using MediatR;
using MFPC.Features.Memories;
using Microsoft.AspNetCore.Mvc;

namespace MFPC.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MemoryController : ControllerBase
    {
        private readonly IMediator _mediator;

        public MemoryController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("all")]
        public async Task<ActionResult> GetMemories()
        {
            var request = new GetMemoriesRequest();

            var result = await _mediator.Send(request);

            return Ok(result);
        }

        [HttpPost("add")]
        public async Task<ActionResult> AddMemory([FromBody] AddMemoryRequest request)
        {
            var result = await _mediator.Send(request);

            return Ok(result);
        }

        [HttpPut("favourite")]
        public async Task<ActionResult> ToggleFavourite([FromBody] ToggleFavouriteRequest request)
        {
            var result = await _mediator.Send(request);

            return Ok(result);
        }

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult> DeleteMemory(int id)
        {
            var request = new DeleteMemoryRequest
            {
                Id = id
            };

            var result = await _mediator.Send(request);

            return Ok(result);
        }

        [HttpPut("update")]
        public async Task<ActionResult> UpdateMemory([FromBody] UpdateMemoryRequest request)
        {
            var result = await _mediator.Send(request);

            return Ok(result);
        }
    }
}
