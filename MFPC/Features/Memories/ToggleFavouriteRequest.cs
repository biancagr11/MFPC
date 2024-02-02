using MediatR;
using MFPC.Data;

namespace MFPC.Features.Memories
{
    public class ToggleFavouriteRequest : IRequest<bool>
    {
        public int Id { get; set; }
    }

    public class ToggleFavouriteRequestHandler : IRequestHandler<ToggleFavouriteRequest, bool>
    {
        private readonly AppDbContext _context;

        public ToggleFavouriteRequestHandler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Handle(ToggleFavouriteRequest request, CancellationToken cancellationToken)
        {
            try
            {
                var memory = _context.Memories.FirstOrDefault(memory => memory.Id == request.Id);

                memory.Favourite = memory.Favourite == null ? false : !memory.Favourite;

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
