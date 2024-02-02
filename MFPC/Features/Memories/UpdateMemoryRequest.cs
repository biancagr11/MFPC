using MediatR;
using MFPC.Data.Models;
using MFPC.Data;

namespace MFPC.Features.Memories
{
    public class UpdateMemoryRequest : IRequest<int>
    {
        public int Id { get; set; }
        public string Date { get; set; }
        public string Text { get; set; }
        public string Mood { get; set; }
    }

    public class UpdateMemoryRequestHandler : IRequestHandler<UpdateMemoryRequest, int>
    {
        private readonly AppDbContext _context;

        public UpdateMemoryRequestHandler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(UpdateMemoryRequest request, CancellationToken cancellationToken)
        {
            DateOnly date;

            try
            {
                date = DateOnly.Parse(request.Date);
            }
            catch (Exception ex)
            {
                return (int)ResponseResult.InvalidDate;
            }

            var memory = _context.Memories.FirstOrDefault(m => m.Id == request.Id);

            if (memory == null)
            {
                return (int)ResponseResult.NotFound;
            }

            memory.Date = date;
            memory.Text = request.Text;  
            memory.Mood = request.Mood;

            _context.SaveChanges();

            return (int)ResponseResult.Success;
        }
    }
}
