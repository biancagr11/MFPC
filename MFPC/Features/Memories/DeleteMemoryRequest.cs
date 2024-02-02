using MediatR;
using MFPC.Data;

namespace MFPC.Features.Memories
{
    public class DeleteMemoryRequest : IRequest<bool>
    {
        public int Id { get; set; }
    }

    public class DeleteMemoryRequestHandler : IRequestHandler<DeleteMemoryRequest, bool>
    {
        private readonly AppDbContext _context;

        public DeleteMemoryRequestHandler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Handle(DeleteMemoryRequest request, CancellationToken cancellationToken)
        {
            try
            {
                var memory = _context.Memories.FirstOrDefault(memory => memory.Id == request.Id);

                _context.Memories.Remove(memory);
                _context.SaveChanges();

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
