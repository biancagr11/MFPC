using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MFPC.Migrations
{
    /// <inheritdoc />
    public partial class AddFavourite : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Favourite",
                table: "Memories",
                type: "bit",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Favourite",
                table: "Memories");
        }
    }
}
