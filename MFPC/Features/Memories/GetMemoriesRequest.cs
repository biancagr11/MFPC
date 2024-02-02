using MediatR;
using MFPC.Data;
using MFPC.Data.Responses;

namespace MFPC.Features.Memories
{
    public class GetMemoriesRequest : IRequest<GetMemoriesResponse>
    {
    }

    public class GetMemoriesRequestHandler : IRequestHandler<GetMemoriesRequest, GetMemoriesResponse>
    {
        private readonly AppDbContext _context;

        public GetMemoriesRequestHandler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<GetMemoriesResponse> Handle(GetMemoriesRequest request, CancellationToken cancellationToken)
        {
            var items = _context.Memories.OrderByDescending(memory  => memory.Date).ToList();

            return new GetMemoriesResponse
            {
                Memories = items
            };
        }
    }
}
