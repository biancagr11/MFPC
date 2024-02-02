namespace MFPC.Data.Models
{
    public class Memory
    {
        public int Id { get; set; }
        public DateOnly Date { get; set; }
        public string Text { get; set; }
        public string Mood {  get; set; }
        public bool? Favourite { get; set; }
    }
}
