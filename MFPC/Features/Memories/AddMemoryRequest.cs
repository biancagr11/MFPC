using MediatR;
using MFPC.Data;
using MFPC.Data.Models;

namespace MFPC.Features.Memories
{
    public class AddMemoryRequest : IRequest<int>
    {
        public string Date { get; set; }
        public string Text { get; set; }
        public string Mood { get; set; }
    }

    public class AddMemoryRequestHandler : IRequestHandler<AddMemoryRequest, int>
    {
        private readonly AppDbContext _context;

        public AddMemoryRequestHandler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(AddMemoryRequest request, CancellationToken cancellationToken)
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

            _context.Memories.Add(new Memory
            {
                Date = DateOnly.Parse(request.Date),
                Mood = request.Mood,
                Text = request.Text
            });

            _context.SaveChanges();

            return (int)ResponseResult.Success;
        }
    }
}
